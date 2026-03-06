---
layout: post
title: "Troubleshooting AWS Network Connectivity: Security Groups and NACLs"
date: 2022-07-07 17:11:39 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

Network misconfigurations are one of the most common reasons an EC2 instance can't reach the internet — or be reached from it. In this lab, a junior administrator deployed a VPC with multiple instances, but Instance 3 has no internet connectivity and they can't figure out why. As the senior administrator, it's my job to troubleshoot and restore connectivity so the instance can be pinged and accessed via SSH. Here's how I worked through it.

## The Scenario

Three EC2 instances are deployed in a VPC. Instances 1 and 2 are reachable from the internet; Instance 3 is not. The task: identify what's different about Instance 3 and fix it.

## Step 1: Check the Security Group

The first thing I did was inspect the security group attached to Instance 3 to see what inbound and outbound rules were configured.

The security group rules looked correct — SSH and ICMP were allowed inbound, and outbound was open. So the security group wasn't the problem.

## Step 2: Check the Subnet NACL

Next, I looked at the Network ACL (NACL) for the subnet Instance 3 was placed in.

The NACL was missing rules for SSH and ICMP inbound, and had a restrictive outbound rule. I edited the NACL to:
- Allow inbound SSH (port 22) and ICMP from anywhere
- Allow all outbound traffic

## Step 3: Assign a Public IP Address

With the NACL fixed, I still needed to test connectivity — but Instance 3 only had a private IP address. I allocated an Elastic IP and associated it with the instance:

1. In the EC2 console, select the instance → **Actions** → **Networking** → **Manage IP Addresses**
2. Click the link to **Allocate Elastic IP address**
3. Allocate the IP, then associate it with Instance 3

## Step 4: Fix the Route Table

I tried pinging the instance but still got no response. With help from the walkthrough video, I spotted the real issue: the subnet's **route table had no route to an internet gateway**.

Instances 1 and 2 were in subnets whose route tables had a `0.0.0.0/0` route pointing to an IGW. Instance 3's subnet was associated with the wrong route table — one without that default route.

I updated the route table association:
- Navigate to **VPC** → **Route Tables**
- Select the route table for Instance 3's subnet
- Edit the association and switch it to the public route table (the one with the IGW route)

## Step 5: Verify Connectivity

After updating the route table, I pinged the Elastic IP:

```bash
ping <elastic-ip-address>
```

And it responded. Problem solved!

## Conclusion

My troubleshooting thought process was to compare Instance 3 against Instances 1 and 2 at each layer of the network stack:

1. **Security Group** — checked first, was fine
2. **Network ACL** — missing SSH/ICMP rules, fixed
3. **Public IP** — missing, allocated an Elastic IP
4. **Route Table** — the real culprit, no IGW route

The key lesson: for any EC2 instance to communicate with the internet, all four pieces need to be in place — security group rules, NACL rules, a public IP, and a route table entry pointing to an internet gateway. Missing any one of them breaks connectivity.

Hope someone learned something today — because I definitely did. Until next time!