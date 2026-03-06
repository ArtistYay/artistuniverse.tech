---
layout: post
title: "A Security Trio in Azure"
date: 2022-07-15 15:10:44 +0000
categories: Cybersecurity
tags: [azure,cloud]
author: admin
---

Protecting a cloud environment requires more than a firewall and a prayer. Microsoft Azure has built an interconnected set of security services that — when used together — give you visibility, control, and response capability across identities, devices, data, and cloud workloads. In this post, I'll break down four of those services: **Azure Active Directory**, **Microsoft Sentinel**, **Microsoft Defender**, and **Microsoft Purview**, and explain how they all fit together.

## What Is Azure Active Directory (AD)?

Azure Active Directory is a cloud-based identity service. It handles two foundational security concerns:

- **Authentication** — verifying that you are who you claim to be
- **Authorization** — controlling what resources you can access

Don't confuse it with the on-premises Windows Server Active Directory. Azure AD is designed for Internet-based services and applications — Microsoft 365, Azure services, and third-party SaaS apps. That said, you can use both together through **hybrid identity**.

When you first sign up for Azure, an Azure AD tenant is already configured. A tenant is your organization's dedicated directory that stores all its users.

### Key Features of Azure AD

- **Application Management** — manage access to cloud and on-premises apps from one place
- **Authentication** — includes Self-Service Password Reset (SSPR) so users can reset their own passwords
- **Conditional Access** — an if/then policy engine: *if* a user wants to access a resource, *then* they must complete a specific action (like MFA)
- **Device Management** — control how cloud or on-premises devices access corporate data

Azure AD also supports **Business-to-Business (B2B)** collaboration — invite partner organizations to access your data without creating local user accounts. And for streamlining onboarding, **Entitlement Management** lets you bundle apps and permissions into access packages that new employees can request.

---

## What Is Microsoft Sentinel?

Microsoft Sentinel is a cloud-native **SIEM** (Security Information and Event Management) and **SOAR** (Security Orchestration, Automation, and Response) platform. In plain terms:

- **SIEM** — collects, correlates, and analyzes security data from across your environment to detect threats
- **SOAR** — automates and orchestrates response actions so your team isn't doing everything manually

Sentinel is built on top of **Log Analytics workspaces**, using Data Connectors to ingest logs from Microsoft services, third-party tools, and custom sources.

### What Sentinel Can Do

- **Detect threats** with built-in machine learning and threat intelligence
- **Investigate incidents** using an AI-assisted investigation graph
- **Respond automatically** with Logic Apps-based playbooks
- **Hunt proactively** for threats using KQL queries
- **Leverage Jupyter notebooks** for machine learning–driven investigations
- **Integrate with Azure Monitor** workbooks for interactive dashboards

Sentinel's analytics rules — including Fusion, Machine Learning Behavioral, Anomaly, Microsoft Security, and Scheduled types — let you configure alerts tailored to your environment using Microsoft's provided templates as a starting point.

---

## What Is Microsoft Defender?

Microsoft Defender isn't one product — it's a family of security tools, each targeting a different attack surface. Here's a breakdown:

### Microsoft Defender for Cloud (formerly Azure Security Center)

Defender for Cloud protects workloads across **AWS, GCP, Azure, and on-premises environments** from a single pane of glass. It uses a **Secure Score** to measure your security posture and recommends specific remediations for misconfigurations. It offers workload-specific plans — for example, Defender for Servers if you need to protect virtual machines hosting sensitive data.

### Microsoft Defender for Identity (formerly Azure ATP)

Social engineering remains the most common attack vector — a user clicks a malicious link and enters their credentials without thinking. Defender for Identity doesn't stop the click, but it **monitors on-premises Active Directory for suspicious user behavior**.

It builds a baseline of normal behavior for each user, then flags anomalies. For example, if a user starts enumerating other accounts in the directory, Defender for Identity maps that to the **reconnaissance** phase of the cyber kill chain and raises an alert.

### Microsoft Defender for Endpoint

Defender for Endpoint provides threat protection across devices — including mobile. It combines:

- **Threat and vulnerability management**
- **Attack surface reduction**
- **Next-generation antivirus protection**
- **Endpoint detection and response (EDR)**
- **Automated investigation and remediation**
- **Behavioral sensors** that gather activity data from endpoints and feed it into Microsoft's threat intelligence cloud

### Microsoft 365 Defender

When you have Defender for Endpoint, Office 365, Identity, and Cloud Apps all running, incidents can span multiple products. Microsoft 365 Defender correlates signals across all of them into **a single incident** — giving you the full who, what, when, where, and how of an attack without pivoting between four different dashboards.

### Microsoft Defender for Office 365

Protects your organization from email-borne threats — malicious attachments and links. It has two plans:

- **Plan 1** — Safe Attachments and Safe Links (detonates attachments in a sandbox before delivery)
- **Plan 2** — Adds automated investigation/response and attack simulation training for users

It operates across four protection layers: Edge, Sender Intelligence, Content Filtering, and Post-Delivery.

### Microsoft Defender for Cloud Apps

As companies move data to the cloud, they need visibility into what SaaS apps employees are using and how. Defender for Cloud Apps acts as a **Cloud Access Security Broker (CASB)** — a gatekeeper between users and cloud services. It helps you:

- Discover shadow IT (unsanctioned app usage)
- Enforce data loss prevention (DLP) policies
- Maintain compliance with government frameworks (HIPAA, PCI DSS, etc.)
- Classify and label sensitive data

---

## What Is Microsoft Purview?

Data is the most sensitive asset in any organization. You need to protect it and prove compliance with regulatory frameworks — and that's where **Microsoft Purview** comes in. It gives you a bird's-eye view of your entire data estate:

- **Classify data** with sensitivity labels (confidential, highly confidential, etc.)
- **Track data lineage** — understand the origin of your data and how it flows through systems
- **Identify stale data** and surface data ownership
- **Enforce compliance** against frameworks like HIPAA, GDPR, and PCI DSS

Purview is a newer service with a rapidly expanding feature set.

---

## How Do They All Fit Together?

Protecting a modern organization means covering identity, endpoints, data, email, and cloud workloads simultaneously. Here's how the Microsoft stack connects:

| Concern | Service |
|---------|---------|
| Who has access to what | **Azure AD** (Conditional Access, MFA, entitlements) |
| Threat detection and response | **Sentinel** (SIEM/SOAR across all data sources) |
| Endpoint and workload protection | **Defender** (Cloud, Endpoint, Identity, Office 365) |
| Data classification and compliance | **Purview** (labels, lineage, regulatory mapping) |

Instead of cobbling together separate tools with separate dashboards, Microsoft makes it possible to manage most of your security posture from a unified interface. Sentinel pulls signals from Defender products and correlates them into incidents; Azure AD controls who gets through the door; Purview ensures the data behind that door is properly classified and protected.

This doesn't mean it's a silver bullet — knowing what your organization needs and properly configuring each service still takes real work. But when it's all set up correctly, it's a genuinely powerful stack.

Thanks for reading! If you have any questions or feedback, reach out to me on LinkedIn.