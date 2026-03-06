---
layout: post
title: "AWS Secrets Manager"
date: 2022-07-04 11:24:34 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

Hardcoded credentials are one of the most common and most dangerous mistakes in cloud development. When your application needs to talk to a database or external service, where should those credentials live? Not in your source code, and definitely not committed to a repo. That's where **AWS Secrets Manager** comes in. In this post, I'll cover what Secrets Manager is and walk through a hands-on lab showing how to use it to authenticate a Lambda function to an RDS database.

## What Is AWS Secrets Manager?

AWS Secrets Manager is a service that lets you securely store, manage, and automatically rotate credentials, API keys, and other secrets. Under the hood, it:

- Encrypts secrets using a **plaintext data key** (derived from AWS KMS)
- Decrypts secrets on retrieval by calling KMS to unwrap the data key
- Supports **automatic rotation** via Lambda-based rotation functions
- Integrates natively with RDS, Redshift, and DocumentDB

The result: your application retrieves credentials at runtime via an API call — no secrets ever touch your source code.

## Lab: Authenticating Lambda to RDS Using Secrets Manager

This lab is from ACloudGuru. The goal is to have a Lambda function securely connect to an RDS database by pulling credentials from Secrets Manager at runtime.

### Step 1: Create the Lambda Function

Create a new Lambda function and deploy it inside the VPC provisioned for the lab. Assign it to the two public subnets and the provided security group.

### Step 2: Add the MySQL Layer

Create a Lambda layer using the provided `mysql.zip` file and attach it to the function. This gives Lambda the MySQL client libraries it needs to connect to RDS.

Update the `index.js` function code with the provided database connection logic.

### Step 3: Create the Secret

In the Secrets Manager console, create a new secret of type **Credentials for Amazon RDS**. Select your RDS instance and enter the database username and password.

### Step 4: Configure Connectivity

For the Lambda function to reach Secrets Manager from within the VPC, three things need to be in place:

1. **Enable a Secrets Manager VPC endpoint** — allows Lambda (running inside the VPC) to reach Secrets Manager without going through the public internet
2. **Update the Lambda security group** — allow outbound HTTPS (port 443) to the Secrets Manager endpoint CIDR
3. **Attach an IAM policy** to the Lambda execution role granting `secretsmanager:GetSecretValue` on the specific secret ARN

> **Note:** I ran into an error when creating the VPC endpoint during this lab, so I wasn't able to fully test the Lambda connection. If you hit the same issue, check that your VPC has **DNS resolution** and **DNS hostnames** both enabled — both are required for interface VPC endpoints to work.

## Wrapping Up

AWS Secrets Manager is just one piece of a broader secrets management strategy. A few complementary practices to layer on top:

- **IAM least privilege** — only allow the specific Lambda role to retrieve the specific secret ARN
- **Automatic rotation** — enable scheduled credential rotation so passwords cycle without manual intervention
- **CloudTrail logging** — audit every `GetSecretValue` call to detect unauthorized access attempts

This is just the surface of what's possible with cloud-native secrets management, there's a lot more to explore!