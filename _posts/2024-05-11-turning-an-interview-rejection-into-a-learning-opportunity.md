---
layout: post
title: "Turning an Interview Rejection into a Learning Opportunity"
date: 2024-05-11 19:17:36 +0000
categories: Interviewing
tags: [Career]
author: admin
---

Sure, that initial rejection email can sting but let me tell you about a recent Cloud Security Engineer interview that turned into a valuable learning experience.

While I didn't get the job (spoiler alert!), I decided to focus on what I could control: my knowledge and skills. So, I'm sharing the interview questions I received and the detailed answers I formulated for each one.

1. ### What is Terraform and how does it help in managing infrastructure?
    
Terraform is an IaC tool that lets you define infrastructure in human-readable language. It uses HCL or Hashicorp Configuration Language to accomplish this. Terraform can automatically provision and manage your infrastructure which eliminates human error, it's repeatable so it's always provisioned and configured consistently, supports multiple cloud providers and you can use version control systems like Git to track and collaborate with other engineers.

2. ### What is the purpose of the Terraform init command?

The command performs several crucial tasks. The first is creating a hidden directory called '.terraform' in the working directory. From there it will download any necessary provider plugins and versions specified for that cloud provider. In the short term, Terraform gets your Terraform environment ready by setting up the essential components needed to work with your infrastructure configurations.

3. ### How do you manage Terraform state files securely?
    
You can manage state files securely by utilizing cloud storage services like AWS S3 and using the KMS key to encrypt files at rest [<sup>[2]</sup>](#References)[<sup>[3]</sup>](#references) or utilize the IaC platform like Terraform Cloud and leverage their built-in encryption capabilities.

4. ### How do you write secure and efficient Python code for an AWS Lambda function?
    
Only include the necessary libraries and dependencies in your deployment package. Store sensitive information like API keys, passwords, and database credentials in the AWS Secret manager, Grant your Lambda function the least privileged access, and lastly choose the appropriate memory allocation for the Lambda function[<sup>[4]</sup>](#references). You can also utilize Lambda layers for more security[<sup>[5]</sup>](#references).

5. ### Can you explain the difference between an IAM role and an IAM policy?
    
An IAM role is an identity within AWS that can be used by users, applications, or other AWS services. An IAM policy is the permissions you will give to that identity, for example, you can specify if that identity has access to certain S3 buckets or can deploy EC2 instances. You can attach policies to a user or group or if you want it more granular you can attach an inline policy.

6. ### How would you implement least privilege access control for AWS resources using Terraform?
    
You can break down actions like "s3:GetObject" or "s3:ListBucket" to that specific resource or principle[<sup>[6]</sup>](#references) Define separate IAM roles for different purposes, for example, have a role for a web server and a separate role for a Lambda function. Set maximum permissions to a user or group, and lastly leverage conditional access[<sup>[7]</sup>](#references). Here's a Terraform sample of breaking down actions:

```go
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-static-content-bucket/*"
      ]
    }
```

7. ### What security best practices would you recommend for storing data in AWS?
    
There are multiple ways you can go about doing this[<sup>[8]</sup>](#references) from IAM to defense in depth (AWS WAF, Amazon Inspector, etc.) to regular backups to strong passwords and implementing MFA but the most common way to utilize encryption at rest using KMS or CMKs for your S3 buckets, EBS volumes, DynamoDB tables, and other data storage services.

How would you handle a secrets manager in a Python application in AWS?

You can use environment variables or the secret manager and create a variable in the script using the 'get\_secret\_value\_ function to retrieve the credentials. Here's an example:

```python
import boto3
import json

# Replace with your secret ID and region
secret_id = "your_secret_id"
region_name = "us-east-1"

# Create a boto3 session
session = boto3.Session(region_name=region_name)

# Create a Secrets Manager client
client = session.client(service_name='secretsmanager')

try:
  get_secret_value_response = client.get_secret_value(SecretId=secret_id)
except ClientError as e:
  if e.response['Error']['Code'] == 'SecretNotFound':
    # Handle the case where the secret is not found
    print("Secret Not Found!")
  else:
    raise e

if "SecretString" in get_secret_value_response:
  secret = get_secret_value_response['SecretString']
else:
  secret = json.loads(get_secret_value_response['BinarySecretData'])

# Access the secret value (might require decryption if KMS is used)
print(f"Retrieved secret: {secret}")

# Use the secret value in your application logic here
```

8. ### How do I implement security controls in AWS using Terraform?
    
You can specify that resource to deploy in that environment:

Security Groups with Restricted Access

```go
resource "aws_security_group" "webserver_sg" {
  name = "webserver_security_group"

  ingress {
    from_port = 80
    to_port   = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust for specific allowed IP ranges
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # Allow outbound traffic to anywhere
  }
}

resource "aws_instance" "web_server" {
  # ...
  vpc_security_group_ids = [aws_security_group.webserver_sg.id]
}
```

Encryption at Rest and in Transit

```go
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-bucket"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.master_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}
```

9. ### What methods should I use to automate security patch deployments in AWS?
    
You can use the Systems Manager Patch Manager, define a patch baseline specifying the patching rules for your resources, target resources using tags, and install patches based on a schedule or trigger[<sup>[9]</sup>](#references).

### Conclusion

Many more questions were asked during the interview, I even had to explain what a terraform code snippet was doing but I'm going to stop it right here since it'll become a long read. I hope these questions give you guys a little insight into what companies are looking for in a Junior Cloud Security Engineer.

### References

1. Shaik, A. (2023, March 11). *Terraform 01: An Introduction to the Terraform Series*. Aasifa Shaik. [https://mysoftwarediary.hashnode.dev/terraform-01-an-introduction-to-the-terraform-series](https://mysoftwarediary.hashnode.dev/terraform-01-an-introduction-to-the-terraform-series)
    
2. Rodgers, M. (2022, June 7). *Using an AWS S3 Bucket to Securely Manage and Encrypt Terraform State Files*. Medium. [https://medium.com/@mjrod/using-an-aws-s3-bucket-to-securely-manage-and-encrypt-terraform-state-files-78a5dac569ab](https://medium.com/@mjrod/using-an-aws-s3-bucket-to-securely-manage-and-encrypt-terraform-state-files-78a5dac569ab)
    
3. *How to Manage Terraform S3 Backend - Best Practices*. (n.d.). Spacelift. Retrieved May 11, 2024, from [https://spacelift.io/blog/terraform-s3-backend](https://spacelift.io/blog/terraform-s3-backend)
    
4. ‌*Best Practices for Writing Python Code for AWS Lambda Function*. (n.d.). CloudThat Resources. Retrieved May 11, 2024, from [https://www.cloudthat.com/resources/blog/best-practices-for-writing-python-code-for-aws-lambda-function](https://www.cloudthat.com/resources/blog/best-practices-for-writing-python-code-for-aws-lambda-function)
    
5. ‌Tanikin, Y. (2023, July 10). *Best Practices for Python with AWS Lambda: An Essential Guide*. Medium. [https://aws.plainenglish.io/best-practices-for-python-with-aws-lambda-an-essential-guide-a22b708f8006](https://aws.plainenglish.io/best-practices-for-python-with-aws-lambda-an-essential-guide-a22b708f8006)
    
6. ‌*Testing IAM policies with the IAM policy simulator - AWS Identity and Access Management*. (n.d.). [Docs.aws.amazon.com](http://Docs.aws.amazon.com). [https://docs.aws.amazon.com/IAM/latest/UserGuide/access\_policies\_testing-policies.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html)
    
7. ‌Douglas, N. (2023, March 21). *Terraform Security Best Practices*. Sysdig. [https://sysdig.com/blog/terraform-security-best-practices/#:~:text=With%20Terraform%2C%20you%20can%20implement](https://sysdig.com/blog/terraform-security-best-practices/#:~:text=With%20Terraform%2C%20you%20can%20implement)
    
8. ‌*Best practices for securing sensitive data in AWS data stores*. (2018, December 24). Amazon Web Services. [https://aws.amazon.com/blogs/database/best-practices-for-securing-sensitive-data-in-aws-data-stores/](https://aws.amazon.com/blogs/database/best-practices-for-securing-sensitive-data-in-aws-data-stores/)
    
9. ‌*Automate Patching with AWS Systems Manager Quick Setup Patch Policy*. (n.d.). [Www.youtube.com](http://Www.youtube.com). Retrieved May 11, 2024, from [https://www.youtube.com/watch?v=nDe9kLnDmsk](https://www.youtube.com/watch?v=nDe9kLnDmsk)