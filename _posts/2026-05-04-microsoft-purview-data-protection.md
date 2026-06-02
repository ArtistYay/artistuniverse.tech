---
layout: post
title:  "Microsoft Purview Data Protection"
date:   2026-05-04
categories: Cybersecurity
tags: [azure, cloud]
---

# Your company’s data has a leak. Here’s how Microsoft is trying to fix it.

*A non-technical look at data protection, compliance roles, and why your IT team cares about sensitive information*

---

Somewhere in your organization right now, an employee is emailing a spreadsheet with someone’s home address in it. Another person is sharing a file that contains medical information. Neither of them means any harm; they just don’t know. That’s the problem Microsoft Purview is designed to solve.

Two foundational things have to happen before any of this works: the right people need to be in charge of data protection, and the system needs to be taught what “sensitive” actually looks like. Neither happens automatically when you buy a Microsoft license.

---

## Giving the right people the keys

Before any data protection tool can do its job, someone has to be accountable for it. In many organizations, it’s genuinely unclear who owns data security versus IT versus legal compliance. Microsoft formalizes this by assigning administrative roles and permissions that define exactly what a person can see and change inside the system.

> **Real-world analogy**: Giving someone the Compliance Administrator role is like handing them the master binder for your regulatory paperwork; they can read everything, set policies, and run audits, but they can’t change payroll or hire people.

**Application Administrator**: Manages software applications connected to your Microsoft account, including how Purview connects to other tools your business already uses.

**Compliance Administrator**: Sets and manages data compliance policies. This is the person responsible for ensuring the organization complies with laws such as GDPR (Europe’s data privacy law) and HIPAA (US healthcare data law).

**Security Administrator**: Manages security settings across the Microsoft environment. Detects threats, sets access rules, and reviews alerts when something looks wrong.

### How it gets set up

1. A global administrator opens the Microsoft 365 Admin Center and finds the user being assigned a role.
2. The specific roles are selected and saved. The user now has access to exactly the parts of the system their role covers.
3. The newly assigned administrator logs into Microsoft Purview and begins configuring data protection settings for the organization.

---

## Teaching the system what “sensitive” looks like

Once the right people are in charge, the next step is teaching Purview to recognize sensitive data before it goes somewhere it shouldn’t. This is done through sensitive information types rules that describe patterns the system watches for across emails, documents, and files.

### Pattern matching and Exact Data Match

**EDM (Exact Data Match)** goes beyond pattern recognition. Instead of flagging anything that looks like an employee ID, you upload your actual employee database so the system only alerts on genuine matches. A product code formatted like “ABC123456” won’t trip the wire; only real employee records will.

> **Real-world analogy**: Like training a mail room worker to hold any envelope with a Social Security number on the outside. They don’t read the letter; they just recognize the pattern and escalate it.

### How it gets set up

1. The administrator defines the pattern and supporting keywords that confirm a real match, for example, three uppercase letters and six numbers near the word “Employee.”
2. For EDM, the actual employee database is exported and hashed into an unreadable format, then uploaded so the raw data never lives inside Microsoft’s systems.
3. Keyword dictionaries are added for language-based detection of disease names and absence terminology so the system flags context, not just isolated words.
4. Everything is tested against sample content before being used in a live policy.

> **Why false alarms matter**: If the system flags hundreds of harmless documents daily, employees start ignoring alerts entirely. EDM keeps the signal meaningful.

---

## Putting a label on it, literally

Detecting sensitive data is one thing. Actually doing something about it is another. Sensitivity labels are tags applied to documents and emails that travel with the file wherever it goes and trigger real protections: encryption, watermarks, access restrictions, and more.

> **Real-world analogy**: Think of a label like a classification stamp on a physical document: “Confidential,” “Internal Use Only.” Except this one also locks the filing cabinet, tracks who opens it, and prevents unauthorized copying.

Labels are grouped by category to keep things manageable:

**Internal > Employee data (HR) | Internal > Financial Data | Internal > Confidential Legal**

Each has different levels of protection depending on how sensitive that type of information is.

## Auto-labeling: no human required

Auto-labeling applies labels automatically based on content; no employee decision needed. If a document contains a credit card number or bank routing number, it gets the “Financial Data” label before anyone has to think about it.

### Double Key Encryption: for the highest-stakes content

**DKE (Double Key Encryption)** means your organization holds one key and Microsoft holds another. Both are required to open the file, so even Microsoft cannot read the content. Combined with a dynamic watermark showing who opened a document and when, this is the highest level of protection available.

> **Real-world analogy**: It’s like a safe deposit box at a bank. The bank has one key, you have the other. Neither of you can open it alone.

How it gets set up

1. Label groups and child labels are created with specific protection settings: encryption, watermarks, and access restrictions per label.
2. Auto-labeling policies run in simulation first, showing what would have been labeled without changing anything, before enforcement goes live.
3. Labels are published to users through label policies. The Confidential Legal label requires written justification before anyone can remove or downgrade it, creating an audit trail for every classification change.

---

## Protecting email at the source

A lot of the most sensitive information in any organization travels by email, and email is easy to forward, screenshot, or accidentally send to the wrong person. Microsoft Purview Message Encryption closes this gap automatically, without changing how employees work.

> **Real-world analogy**: Sending an unencrypted email is like mailing a document in a clear plastic envelope; anyone handling it along the way can read it. Encryption puts it in a sealed, locked box. Only the person with the key can open it on the other end.

A mail flow rule runs silently on every email from the Finance department. When someone in Finance sends an email, it’s encrypted, and a disclaimer is appended automatically. The Finance team sends emails exactly as they always have; they don’t press an “encrypt” button or change their workflow at all.

What the recipient sees from outside the organization:

> **Encrypted message**
> This message is protected. Sign in or use a one-time passcode to read it.
> This email has been encrypted and sent securely by Contoso Ltd.

### How it gets set up

1. The administrator creates a mail flow rule in the Exchange Admin Center, the control panel for company email, targeting the Finance department group.
2. Encryption and a disclaimer are configured as automatic actions on every matching outbound email.
3. The rule is enabled. Finance staff sends email exactly as before; the protection applies without any change to their workflow.

---

## Stopping sensitive data before it leaves, DLP policies

**DLP (Data Loss Prevention)** is the enforcement layer. Where labels describe what data is, DLP controls what can be done with it. Policies watch for sensitive content moving through Teams, email, files, and cloud storage and act when they find it.

For example: when someone tries to send a credit card number to a person outside the organization, they see a policy tip:

> **Policy tip**
> This message appears to contain a credit card number. Sharing this information outside the organization may violate company policy.
> [Override with justification] [Don’t send]

The override matters. DLP isn’t designed to be a brick wall; it’s designed to catch accidents and make people pause. A salesperson who genuinely needs to share payment information can still do it. They just have to acknowledge why, and that acknowledgment is logged.

### Testing before enforcing, simulation mode

Before a policy goes live, it runs invisibly in the background, scanning the same content it would enforce against and showing administrators what it would have caught. This prevents a poorly tuned policy from generating hundreds of false positives and drowning the security team in noise.

### How it gets set up

1. A DLP policy is created by selecting which channels to cover: Teams, Exchange, SharePoint, OneDrive, or a combination.
2. Rules define triggers and actions that block external sharing, notify the user, and require justification to override.
3. The policy runs in simulation first. The team reviews match rates before activating enforcement.
4. Policy priority determines which policy wins when multiple policies fire on the same content simultaneously.

---

## When the threat is physical, endpoint DLP

Cloud DLP protects data as it moves through digital channels. Endpoint DLP extends protection to company devices. An employee plugging a USB drive into a company laptop and copying files is one of the most common ways sensitive data leaves organizations. Not through a sophisticated attack, but through a thumb drive in a pocket.

> **Real-world analogy**: Cloud DLP is like a security guard at the building’s email server checking every message that goes out. Endpoint DLP is a guard standing next to every desk, watching what employees plug in and copy to physical media.

Endpoint DLP can control:

- **USB drives**: Block copying sensitive files to removable storage
- **Browsers**: Restrict which browsers can upload sensitive content
- **Cloud services**: Block uploads to specific domains like personal Dropbox accounts
- **File paths**: Exclude specific folders from scanning for approved use cases

When an employee tries to copy a file containing a Social Security number to a USB drive, the transfer is blocked, and they see a notification explaining why.

### How it gets set up

1. Devices are onboarded by running a script that registers them with the organization’s Microsoft tenant and joins them to Microsoft Entra ID, the organization’s identity system.
2. A DLP policy targeting Devices is created, specifying which sensitive information types to watch for and what to block.
3. Additional settings are configured: permitted browsers, blocked cloud domains, and folder exclusions.
4. The policy runs in simulation, then activates automatically after a set period if no changes are made, removing the risk of a policy being forgotten before it’s ever enforced.

> **Note on browsers**: For DLP policies to work in Chrome, the Microsoft Purview Extension must be installed on each device. Microsoft Edge has this built in. Chrome requires a one-time install.

---

## How long to keep data and when to delete it

Keeping data longer than necessary isn’t just wasteful; it’s a liability. Every record your organization holds is a potential target. On the other hand, deleting records too soon can create legal risk if that data is needed in an audit or investigation.

> **Real-world analogy**: Think of it like a records room with a filing system. Each folder has a label that says when it was created, how long it needs to be kept, and what happens when that time is up: shredded, archived, or handed to legal. Purview’s retention policies are built into the system and run automatically across every file, email, and message in your Microsoft environment.

### Retention labels: tagging individual records

A retention label governs lifespan. A financial records label might say: keep this file for five years from the last time it was modified, then delete it automatically. Once applied, the system tracks the clock and handles cleanup without any further human involvement.

**The lifecycle of a labeled file**:

| Stage | What happens |
|---|---|
| Day 1: Label applied | Five-year retention clock starts from last modified date |
| During retention period | File is protected from deletion, even by administrators |
| After 5 years | System deletes the file automatically, no human action required |

> **Why automatic deletion matters**: Most organizations don’t delete old data not because they want to keep it, but because no one has a process for cleaning it up. Retention policies remove that gap.

### Two ways to apply retention labels

Labels can be applied manually by employees, or automatically through auto-apply policies that watch for specific sensitive information types, the same patterns used by DLP. An employee creating a spreadsheet with bank account numbers doesn’t need to think about retention rules; the policy handles it.

### Retention policies at scale

Retention labels work record by record. Retention policies apply rules at scale covering entire platforms in one go. A Teams retention policy can cover every chat message and channel post across the organization: keep them for 3 years, then automatically delete them. No one tags individual Teams messages.

### Targeted retention for sensitive groups

Not every department should have the same retention rules. Adaptive scopes let you target retention policies at specific groups Leadership and Operations, for example rather than the entire organization. If someone joins or leaves those groups, the policy follows them automatically.

### How it gets set up

1. A retention label is created defining the lifespan and what happens at the end: delete automatically or trigger a review.
2. The label is published to users, making it available as a manual option in Exchange, SharePoint, and OneDrive.
3. An auto-apply policy scans for specific sensitive information types and automatically applies an existing label.
4. The auto-apply policy runs in test mode first, before full enforcement begins.
5. For targeted retention, an adaptive scope is created defining which groups to cover, and a separate retention policy is built using that scope.

---

## When the risk comes from inside insider risk management

Every layer of protection covered so far assumes a relatively clear boundary: sensitive data should stay inside the organization. But some of the most damaging data incidents come from people who already have legitimate access: employees, contractors, or privileged users whose behavior shifts in ways that suggest risk.

Insider Risk Management doesn’t treat every employee as a suspect. It watches for patterns of behavior that, taken together, suggest something worth investigating. A single unusual action rarely means anything. A sequence of them might.

> **Real-world analogy**: Think of it like a bank’s fraud detection system. Your card isn’t blocked because you made one purchase in a new city. It flags when you make an unusual purchase, then a cash withdrawal, then another purchase abroad all within an hour. No single action is the problem. The pattern is.

### What the system watches for

Insider Risk Management draws on signals across Microsoft 365 and Microsoft Defender for Endpoint:

- **File exfiltration**: Unusual volume of downloads or uploads outside normal patterns
- **Risky browsing**: Visits to sites associated with data theft or policy violations
- **Office activity**: Mass deletion or accessing files outside normal scope of work
- **Defender alerts**: Device-level threats, malware, disabled protections, defense evasion

### Not all employees carry equal risk.

Some employees have access to significantly more sensitive information than others. Priority user groups let administrators define which employees warrant closer monitoring: finance teams, legal staff, executives, because the potential impact of a breach involving their data is higher.

> **An important distinction**: Insider Risk Management is not surveillance. It correlates signals that already exist across Microsoft 365 and Defender actions the system was already recording for other purposes and looks for patterns that warrant human review. A compliance investigator still makes the call on whether an alert represents a real incident.

## How it gets set up

1. The administrator is granted the Insider Risk Management role in Microsoft Purview.
2. Policy indicators are turned on, selecting which behavioral signals to watch for: file exfiltration, risky browsing, Office activity, Defender alerts.
3. Defender for Endpoint integration is enabled so device-level security alerts feed into insider risk profiles.
4. Policies are created: quick templates for common scenarios like data leaks, or custom policies for priority user groups.
5. Priority user groups are defined, specifying which employees receive closer monitoring and who on the security team can view their activity data.
6. Notice templates are created so when an alert is investigated, the team has a consistent, pre-approved message ready to send.

---

## When risk scores change how security rules behave, adaptive protection

Every tool covered so far applies the same rules to everyone. A DLP policy treats the cautious long-tenured employee the same as someone whose behavior has already raised red flags. Adaptive Protection closes that gap by connecting insider risk scores directly to enforcement controls.

Instead of fixed rules that apply uniformly, protection tightens automatically when an employee’s risk level rises and relaxes when it returns to normal.

> **Real-world analogy**: Think of it like a building access system that gives most employees standard badge access. But if someone is under active investigation, their badge quietly stops working on the server room door: no confrontation, no announcement, just reduced access while the situation is reviewed.

### What changes at each risk level

| Risk level | What happens |
|---|---|
| Normal | Standard DLP rules apply. Override with justification permitted. Full system access maintained. |
| Moderate | DLP warnings become stricter. Overrides require more specific justification. |
| Elevated | Sharing of sensitive data blocked entirely. Conditional Access may restrict system access. |

### The Conditional Access piece

**Conditional Access** is a feature in Microsoft Entra ID, Microsoft’s identity platform that controls who can sign into what, and under what conditions. When integrated with insider risk, it can block access to all company resources for elevated-risk users until their risk level drops. This typically starts in report-only mode so the security team can validate the policy before it goes live.

### How it gets set up

1. An insider risk policy is linked to Adaptive Protection; this tells the system which policy’s risk scores should drive enforcement changes.
2. The existing DLP policy is updated with a new condition: if the user has an elevated insider risk level, block sharing entirely rather than allowing override with justification.
3. A Conditional Access policy is created that blocks all system access for elevated-risk users, starting in report-only mode.
4. Adaptive Protection is switched on. Enforcement adjusts automatically as users’ risk scores change.

---

## Proving it all happened, the audit log

Every tool in this article is only as credible as the record it leaves behind. A DLP policy that blocked a sensitive share, a label that was stripped from a document, a security rule that was quietly changed none of that means anything in an investigation or regulatory audit unless there is a timestamped, tamper-resistant record showing exactly what happened, when, and who was responsible.

> **Real-world analogy**: Think of it like the black box on an aircraft. While everything is running normally, nobody’s looking at it. But when something goes wrong or when a regulator asks what happened, it’s the definitive record of every action taken.

### What gets recorded

A sample audit log entry:

| Field | Value |
|---|---|
| Activity | Updated DLP rule |
| User | Joni Sherman |
| Date and time | April 19, 2026 at 14:32 UTC |
| Policy affected | DLP: Credit Card Protection |
| Change | Condition added: Insider risk elevated → Block everyone |

### The problem with default retention

By default, Microsoft retains audit logs for 180 days. For many compliance frameworks, that isn’t enough. Regulatory investigations often look back a year or more. Audit retention policies extend how long specific categories of logs are kept. DLP matches across email, SharePoint, and endpoint devices can be preserved for a full year or longer.

### How it gets set up

1. The administrator opens the Audit solution in Microsoft Purview and configures a search, selecting a date range, activity types, and a name for the search.
2. Results are reviewed and exported to a file for offline review or sharing with external auditors.
3. An audit retention policy is created specifying which record types to preserve and for how long.

---

## When something has already gone wrong, content search

Every tool covered so far is preventive. But sometimes an alert arrives after the fact. A potential breach is reported. A regulator asks whether specific data was exposed. The question shifts from “how do we prevent this” to “what actually happened.”

**eDiscovery (electronic discovery)** searches through an organization’s digital content, emails, chats, files, and SharePoint sites to find specific information relevant to an investigation. It works in minutes across the entire Microsoft 365 environment.

> **Real-world analogy**: Think of it like a legal discovery process the phase of litigation where each side must produce relevant documents. Except instead of lawyers sorting through filing cabinets for weeks, the search runs in minutes and returns every matching item across every mailbox, Teams conversation, and SharePoint site the organization has.

A content search for financial data exposure might target keywords like “bank account” and “credit card” across all Finance team content, returning every email, document, and Teams message where those terms appear, showing who created it and when.

> **Access control matters here too**: The eDiscovery Manager role grants this capability to specific, trusted individuals, keeping investigative access controlled and auditable, just like the administrative roles discussed at the start of this article.

How it gets set up

1. The administrator grants the investigator the eDiscovery Manager role.
2. A case is created in Microsoft Purview to contain and document the investigation.
3. Data sources are added to scope the search: specific users, groups, or sites.
4. Keywords are entered, and the query runs. Results show where terms appeared, in what context, and who created the content.

---

## The newest frontier, protecting data in AI

Every data protection challenge described in this article existed before AI tools arrived in the workplace. AI introduces the same risks through a new interface. When an employee pastes a client contract into ChatGPT to ask for a summary, or types a customer’s financial details into Microsoft Copilot as context for a question, that data leaves the controlled environment.

> **Real-world analogy**: Every data protection rule that applies to a shared drive also applies to what you feed an AI assistant; it just hasn’t felt that way yet because the interface looks like a conversation rather than a file transfer. But from a data governance perspective, pasting a payroll spreadsheet into a chatbot is the same risk as emailing it to the wrong person.

**DSPM for AI (Data Security Posture Management for AI)** addresses four risk categories:

- **Sensitive data in prompts**: Employees pasting confidential information into AI tools
- **Risky AI interactions**: Copilot usage patterns that suggest data exfiltration risk
- **Unethical behavior**: Policy-violating content in prompts or AI-generated responses
- **Unlabeled content exposure**: Files without sensitivity labels that Copilot could surface in responses

### Blocking sensitive data at the AI interface

A DLP policy watches what employees paste or upload into generative AI websites. When it detects sensitive content, it blocks the action before the data reaches the AI tool. This policy connects directly to Adaptive Protection; a normal-risk employee might see a warning with an override option; an elevated-risk employee gets a hard block.

### The labeling gap that AI exposes

Copilot is good at surfacing relevant content; ask it about a client, and it pulls emails, documents, and notes from across SharePoint and OneDrive. That’s useful. It’s also a problem if some of those documents are sensitive but unlabeled. A data risk assessment scans SharePoint for files without sensitivity labels that Copilot could surface, generating a prioritized list of labeling gaps to close.

### How it gets set up

1. A DLP policy is created from DSPM for AI recommendations, blocking sensitive content from being pasted into generative AI websites with stricter enforcement for elevated-risk users through Adaptive Protection.
2. An insider risk policy using the Risky AI Usage template monitors Copilot interactions, tracking risky prompts, sensitive responses, and browsing to AI sites.
3. A communication compliance policy detects unethical or policy-violating content in Copilot prompts and responses.
4. A data risk assessment runs against SharePoint to identify files without sensitivity labels that Copilot could expose, generating a prioritized list of labeling gaps to close.

---

## Does any of this actually work?

Configuring policies is one thing. Knowing they fire correctly in the real apps employees use every day is another. Every data protection system has the same failure mode: settings that look right in an admin portal but don’t translate into actual behavior when a real person opens Word, sends an email, or clicks on a document in SharePoint.

### Sensitivity labels in Word

Opening a Word document and confirming that sensitivity labels are visible and selectable proves label propagation worked. Applying an HR label to a document should immediately trigger the configured protections: the watermark stamped across the page, the header and footer added to every page, and the document encrypted.

Trying to downgrade the label to something less restrictive should trigger a justification dialog. If that dialog never appears, the policy isn’t working, and the only way to know is to test it.

### DLP policies in Outlook

Sending an email containing employee IDs to confirm that the DLP policy blocks it proves the difference between a policy that exists and one that enforces. If the policy is working, the email never arrives. The sender receives a delivery failure notification explaining the message was blocked by a data loss prevention policy.

This single test confirms three things: the sensitive information type is correctly configured, the DLP policy is active and applied to Exchange email, and the rule condition matches the correct pattern.

### Retention and sensitivity labels in SharePoint

When navigating to a document in SharePoint and opening its details panel, both the sensitivity label field and the retention label field should be displayed. Applying both confirms the full lifecycle is covered: the document is classified as confidential, and the retention policy knows how long to keep it before automatic deletion.

### Why this step matters for the business

Most data protection implementations stop at configuration. Policies get created, someone checks a box on a project plan, and the assumption is that everything is working. Validation challenges that assumption with evidence.

For a compliance team presenting to leadership or preparing for a regulatory review, the difference between “we configured these policies” and “we tested these policies and confirmed they behave as expected” is significant. The first is a claim. The second is a demonstration.

---

## The complete picture

Microsoft Purview isn’t a single tool; it’s a set of overlapping controls that address the full data protection lifecycle. Classify the data. Protect it in transit. Control what employees can do with it. Monitor behavior for signs of risk. Tighten enforcement automatically when risk rises. Record every action for accountability. Search the record when something goes wrong. Extend all of that to AI. And then test it because a policy that hasn’t been validated is just a policy on paper.

None of these layers is sufficient on its own. A DLP policy without good sensitive information types fires on the wrong things. Labels without retention policies leave data sitting around indefinitely. Insider risk monitoring without audit logs can’t support an investigation. The value of the platform is in how the pieces connect, each one making the others more effective.

The organizations that implement this well don’t do it all at once. They start with the foundations, get roles right, define what sensitive means, publish labels, and build from there. The goal isn’t a perfect system on day one. It’s a system that improves continuously, leaves a defensible record of every step, and gets tested regularly enough that when someone asks if it works, the answer is yes and there’s proof.