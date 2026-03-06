---
layout: post
title:  "Defeating the “Midnight” 🌚 Breach | Microsoft CCP Blue Team CTF"
date:   2026-02-10
categories: Cybersecurity
tags: [azure, cloud]
---

Participating in the Microsoft CCP Blue Team CTF provided a deep dive into a sophisticated multi-stage attack involving credential theft, lateral movement, and cloud exfiltration. Below is a detailed breakdown of the investigation, from the initial phishing email to the eventual compromise of ADFS certificates.

---

### Phase 1: Initial Access and Discovery

The attack began with a phishing attempt. By analyzing the Email Entity tab and the Email Preview, I identified the sender and the primary target.

* Sender: `jonis@vnevado.alpineskihouse.co`
* Target Persona: The email targeted Polly W, the Managing Director and Head of Cybersecurity at Contoso Electronics Management.
* Malicious Link Behavior: In the sandbox view (Email Entity -> URL -> Export), the provided link was flagged for suspicious Navigation behavior properties.
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106101205.png)

### Phase 2: Host Compromise

Once the link was interacted with, the first device was compromised. I tracked the activity via the Device Timeline.

* Compromised Device ID: `31a048e5eea6ad6e6bc025bfa9e0e571c4c20f7e`
* The Payload: A PowerShell script named `.\Midnight124.ps1` was executed.
* Account Context: The script was run by the user `kdickens@niseko.alpineskihouse.co`.

### Phase 3: Credential Harvesting and Deception

Once it gained a foothold, the attacker focused on escalating privileges.

* Exposed User: I identified `pgustavo` as the exposed user on the device.
* Privilege Level: A check of group memberships revealed that `pgustavo` was a member of Domain Admins, Domain Users, and Administrators.
* Deception: Interestingly, a deception account `stevem` was present on the device, intended to lure attackers into interacting with fake credentials.
* LSASS Access: The attacker used *Mimikatz* to dump memory and access LSASS. The source for this tool was a GitHub repository:

  BE CAREFUL `https://raw.githubusercontent.com/g4uss47/Invoke-Mimikatz/master/Invoke-Mimikatz.ps1.`

* Execution Method: The script was loaded directly into memory to evade disk-based detection.
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106102927.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106103034.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106103502.png)

### Phase 4: Lateral Movement and DCSync

With Domain Admin credentials (`pgustavo`), the attacker moved toward the Domain Controller to perform a DCSync attack.

* The Attack Tool: A script located at `C:\Script\ContosoADFSadmincreds.ps1` triggered the DCSync.
* Command: `Invoke-Mimikatz -Command "$arg"`
* Lateral Movement: The attacker utilized `Invoke-SMBExec` to move across the network. This tool created a temporary service named `MNCKQWHNSJQWLYBWCJBT` on remote machines to execute code.

![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106103857.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106104356.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106105054.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106110228.png)

### Phase 5: ADFS Certificate Theft

The ultimate goal of on-premises was to extract Active Directory Federation Services (ADFS) tokens.

1. Preparation: A script `C:\Scripts\RenamePowershell.ps1` was executed, followed by the creation of a scheduled task: `Run-ExportADFSTokenSigninCert.[Timestamp]`.
2. Execution: The task triggered a binary (`1yc3fegs.0uy.exe`) that executed a Base64 encoded command. Decoded, this revealed: `C:\Scripts\ExportADFSTokenSigninCert.ps1`.
3. Extraction: The script used LDAP queries to extract the secret and created a file named `ADFSTokenSigningCertificate.pfx`.
4. Exfiltration: The certificate was uploaded to Azure Blob Storage.
5. Remediation: Evidence showed the scheduled task was eventually remediated using the `LiveResponseCommand` (specifically the `ad` command).

![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106113215.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106113801.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106114106.png)
![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106114143.png)

## Phase 6: Cloud Impact and Persistence

The theft of the ADFS certificate allowed the attacker to bypass traditional authentication in the cloud.

* MFA Bypass: Logins showed the MFA method `MfaDoneAtExtIdP`, indicating the attacker used the stolen certificate to claim MFA was already completed by the external Identity Provider.
* Persistence: The attacker added a delegated permission grant to an application named `SimulandApp`.
* Secret Injection: A new secret named `SimuLand2023_RiAdb` was set for the application.
* Data Access: Finally, the investigation confirmed the attacker accessed user data, evidenced by `MailItemsAccessed` logs.

![Screenshot]({{ site.url }}{{ site.baseurl }}/assets/images/Pasted image 20241106114429.png)

---

## Executive Briefing

The “Midnight” breach was not a simple malware infection; it was a targeted Identity Attack designed to bypass our most expensive security controls, including Multi-Factor Authentication (MFA). By moving from a single workstation to the heart of our identity infrastructure (ADFS), the attacker gained the ability to impersonate any user within our cloud environment.

### The Business Risk Breakdown

The following table translates the technical discovery from the Microsoft CCP Blue Team CTF into specific business risks.


| Attack Phase | Technical Action | Business Impact | Risk Level  |
|----------|----------|----------|----------|
| Initial Entry | Phishing via Alpine Ski House domain. | Unauthorized Access: Compromise of leadership-level communications. | Medium |
| Credential Theft | Mimikatz used to harvest Domain Admin credentials (pgustavo). | Privilege Escalation: Attacker gains "Keys to the Kingdom" (Administrative rights). | Critical |
| Lateral Movement | Automated movement across the network using Invoke-SMBExec. | Internal Spreading: The infection moves from one laptop to the entire data center. | High |
| Identity Hijack | Extraction of ADFS Token Signing Certificate. | Trust Breach: Attacker can now forge login tokens for any employee. | Critical |
| Cloud Exfiltration | Manipulation of SimulandApp and mail access. | Data Theft: Sensitive corporate emails and application data were compromised. | High |

### Critical Failure Point: The ADFS Compromise

The most significant business impact occurred when the attacker stole the ADFS Token Signing Certificate.

In plain terms, ADFS is the “Passport Office” for our company. By stealing the signing certificate, the attacker effectively stole the official government stamp. They could then create their own “passports” (authentication tokens) to enter our Microsoft 365 environment. This allowed them to bypass MFA because our cloud system believed the “Passport” was already verified by a trusted authority.

### Strategic Lessons for the C-Suite

1. Identity is the New Perimeter: The firewall did not stop this. The attack lived and died by the compromise of the `pgustavo` account. Protecting high-privilege identities is our primary defense.
2. MFA is Not a Silver Bullet: Because the attacker compromised the Identity Provider (ADFS), they were able to signal to the cloud that MFA was already “Done at Extension.” You must move toward “Phishing-Resistant” MFA (like FIDO2/Passkeys).
3. Modernizing Identity: This incident proves that legacy on-premises identity tools (such as ADFS) are high-value targets. Migrating to a cloud-native identity model (Microsoft Entra ID) reduces the “on-premise footprint” that attackers can exploit.

### Next Steps for Resilience

* Audit High-Privilege Accounts: Reduce the number of Domain Admins to the absolute minimum.
* Deception Technology: The presence of the `stevem` honey-pot account was a successful detection signal; you should expand the use of “Canary” accounts to catch attackers early.
* Incident Response: Confirmed remediation of the scheduled tasks, but a full rotation of the ADFS certificates is mandatory to ensure the attacker is completely locked out.