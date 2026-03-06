---
layout: post
title:  "My Experience with the Ninjas of Microsoft 🥷🏾"
date:   2025-12-20 15:11:36 -0500
categories: Cybersecurity
tags: [microsoft, azure ,cloud]
---
## Hackathon

The hackathon at Westlake Brewery featured inclusive app development and unique tasks, such as spinning a challenge wheel. A memorable challenge was telling the story behind Oktay Sari’s nickname, the “Dutch Cowboy.”

During the hackathon, I was panicking—my team was mostly security-driven, and I didn’t know where to start. Our captain, Ugur Koc, had a clear plan: build a website with an AI chatbot that matches users based on their time zone, communication style, and work habits. The chatbot answers queries like, 'How well do I work with Artist?' or gives advice on adapting to different team styles.

1. Ugur introduced the T3 app, a tool that helps build the website's frontend (the part users see and use) using programming languages suitable for both server-side and client-side development.
    
2. For the AI agent, we used OpenAI tools to enable chatbot functionality. To store users’ preferences, we set up a PostgreSQL database and managed it through Supabase, a platform that makes it easier to use the database online.
    
3. The team decided that all participants should log in using their hackathon credentials via Entra ID (an identity service). We requested permission to register the app, specifying that it should function as a single-page application.
    
4. We enabled Row-Level Security (RLS) for the database, so only authenticated users could enter their own data and only view information belonging to other users, ensuring data privacy and security.
    
5. Bought a domain named big-corporation.org.
    
Overall, I learned a lot, got valuable career advice, and felt more confident by the end. After we wrapped up, the event transitioned to presentations and awards. The energy carried over as the conference continued with more sessions and learning opportunities.

![Hackathon Team]({{ site.url }}{{ site.baseurl }}/assets/images/hackathon.png)

And here is a screenshot of the app/website

![Hackathon App]({{ site.url }}{{ site.baseurl }}/assets/images/hackathonApp.png)

At the end of the event, we won first place! The team decided I should take home the golden clippy, which was a great way to conclude the hackathon and move into the next phase of learning at the conference.

![Hackathon Trophy]({{ site.url }}{{ site.baseurl }}/assets/images/trophy.png)

# Day 1

We started the opening with actual ninjas! I was surprised and out of breath watching the flip and do sword play.

[Linkedin Post](https://www.linkedin.com/posts/workplace-ninjas-us_ninja-wpninjas-wpninjasus-activity-7404206617468125184-EsHD?utm_source=share&utm_medium=member_desktop&rcm=ACoAACIp3-gBFCOSLN34izeeoEaxGH7sY5ntVQA)

### Navigating the New Frontier: Embracing Cloud-Native and AI for Enhanced Security and Productivity

This talk was about how Copilot can integrate with Intune to make workflows more efficient. Some of the things that piqued my interest and I learned about were:

1. The Copilot agent can be used as a change review assistant. It analyzes your change request and provides recommendations based on it; for example, if you request adding a firewall rule, the agent could say, ‘Hey, this might break such and such.’
    
2. Use the agent to offboard BYODs from inactive Entra ID users in the tenant.
    
3. There will be a dashboard that explains to admins what the agent wants to do, and you or other admins can approve or deny the tasks.
    
4. The agent will not have its own separate permissions; instead, it will execute any tasks you approve or automate on your behalf.
    
[https://techcommunity.microsoft.com/blog/microsoftintuneblog/whats-new-in-microsoft-intune-at-ignite/4471043.](https://techcommunity.microsoft.com/blog/microsoftintuneblog/whats-new-in-microsoft-intune-at-ignite/4471043)

### Brains, Bloopers, and Bytes: The Fun Side of Neurodiversity/Neurodegeneration in Tech

Somesh Pathak’s openness about Parkinson's Disease resonated with me, as I also have ADHD, and public speaking gives me anxiety. I admired his bravery, and his friends surprised him with gifts and a cake.

The interaction was very wholesome, and it resonated with me. I hope to experience that level of support from friends one day.

[https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Brains%2C%20Bloopers%2C%20and%20Bytes.pptx](https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Brains%2C%20Bloopers%2C%20and%20Bytes.pptx)

### DIY Intune Tools: PowerShell + Graph = Admin Superpowers

In this session, I learned how Ugur Koc and Jannik Reinhard built tools using PowerShell and the Graph API to streamline security tasks.

Everything in Intune uses Graph AP. Every button click, every data point you see in the Intune portal is powered by Microsoft Graph behind the scenes.

The graph API structure is\`graph.microsoft.com/\[version\]/\[resource\]?\[parameters\]\`

While v1.0 is officially supported, beta endpoints provide much more data and functionality. Most of the Intune portal itself uses beta endpoints.

There are three Ways to discover API endpoints:

1\. Microsoft Graph Explorer(\`developer.microsoft.com\`) - Test queries, see raw data, and generate code snippets  
2\. Browser Developer Tools - Open Network tab (F12), perform actions in the portal, and copy the exact API calls  
3\. Graph X-Ray browser extension - Automatically generates PowerShell code from your portal actions

Some authentication best practices for scripting in PowerShell:

1\. Managed Identity(best for Azure resources) - No secrets, lifecycle tied to resource, most secure  
2\. Service Principal with Certificate- For non-Azure environments  
3\. User Authentication- Only for local, one-off scripts

Managed identities can't have permissions added via the Azure portal UI - you must use PowerShell scripts to assign Graph permissions.

Use PowerShell SDK when:

1. You need quick, simple authentication.
    
2. Token refresh automation is important.
    
3. You're comfortable managing module dependencies.
    
Use native `Invoke-RestMethod` when:

1. You want to avoid PowerShell module management nightmares.
    
2. Running in environments with module conflicts
    
3. Need maximum portability across systems.
    
Never install the full `Microsoft.Graph` module - it's massive and nearly impossible to update. Only install specific modules, such as `Microsoft.Graph.Authentication`. The Graph API limits responses to ~100 objects; you must handle pagination for larger datasets. In Azure Automation Accounts, create custom runtime environments with preloaded modules to avoid reinstalling dependencies on every run.

For MSP/Multi-Tenant Environments, use Azure Lighthouse to:

1. Deploy runbooks across multiple client tenants.
    
2. Centrally manage automation at scale.
    
3. Configure tenant-specific permissions
    
4. Execute scheduled tasks across your entire customer base.
    
Don't build from scratch. Search the community first. About 80% of automation needs have already been solved by someone else. MVPs, GitHub repositories, and community blogs are goldmines of ready-to-use solutions:

1. **IntuneAutomation.com** - 35-40 ready-to-use scripts with "Deploy to Azure" functionality
    
2. **Open source templates** - Remediation scripts, detection scripts, notification templates
    
3. **Graph X-Ray** - Browser extension for automatic code generation
    
4. **IntuneChange.com** - Track and visualize configuration changes over time
    
[https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/DIY%20Intune%20Tools%20PowerShell%20GraphAdmin%20Superpowers.pptx](https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/DIY%20Intune%20Tools%20PowerShell%20GraphAdmin%20Superpowers.pptx)

### Break/Side-quests

I met Mona, who introduced me to other MVPs, which led me to connect with them. We all sat around the table, and some gems were shared:

1. Your Resume Should Tell a Story, Not Check Boxes
    
2. ATS Systems Won't Get You Hired, People Will
    
3. Stop Performing, Start Being Authentic
    
4. Your "Why" Matters More Than Your Certifications
    
5. Honor Your Past, Don't Hide It
    
The last session of day one was the Women in Tech Panel, where I learned the background of Esther Barthel, Mona Ghadiri, Ewelina Paczkowska, and Lavanya Lakshman. One thing I remember from this panel was how Ewelina had signed up for a SQL class in high school. Upon entering the room, there were 20-25 boys, and because it made her nervous, she never took the class because she was the only girl there. In a male-dominated space, I understand how small you can feel as a woman.

# Day 2

The day started with the talk ‘The Everywhere Desktop: Secure productivity on any device with the Windows Cloud’, which discussed the use of AI and AVD together. I don’t have any notes for this talk, but here are the PowerPoint slides used.

Link to slides:

1. [https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Ninja%20US%20Keynote%20-%20Windows%20Cloud.pdf](https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Ninja%20US%20Keynote%20-%20Windows%20Cloud.pdf)
    
2. [https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Ninja%20US%20Keynote%202%20-%20Frontier%20Firms%20-%20Powering%20the%20Future%20with%20AI%E2%80%91Enabled%20Cloud%20PCs%20and%20Windows%20365%20for%20Agents.pdf](https://github.com/mobilejon/WorkplaceNinjasUS/blob/main/Ninja%20US%20Keynote%202%20-%20Frontier%20Firms%20-%20Powering%20the%20Future%20with%20AI%E2%80%91Enabled%20Cloud%20PCs%20and%20Windows%20365%20for%20Agents.pdf)
    
## Side-quests

I wanted more guidance on my career path and what I want to do, so I decided to book two 1:1 sessions with Fabian Bader and Ugur Koc. I was able to ask Fabian questions ‘What signals differentiate a junior who scripts tasks from a mid-level engineer who designs automation systems?’ and ‘How does he decide which Azure and M365 security controls to automate first in an enterprise environment?” All questions are meant to give me a little insight into how to grow strategically into a mid- to senior-level position. How can I identify intuitively and improve on what I was yesterday? He gave me wonderful advice and made me realize I want to continue moving forward with cloud security, with DevSecOps & Security Automation as my main focus. My talk with Ugur was about how to start creating automation tools like his, and the main thing I should focus on is APIs.

## Tenant Tetris: Stacking securely with Microsoft Defender MTO

I had never heard of MTO before this talk, and I remember it because it inspired me and left me with some good nuggets.

Managing multiple Microsoft Defender tenants creates three core challenges: context switching between tenants (like playing multiple Tetris games simultaneously), configuration misalignment across environments, and scale issues when managing dozens or hundreds of tenants simultaneously.

Instead of creating separate incident queues for each tenant, organize your SOC by squad specialization and severity levels. This approach maintains consistent psychological standards of care for all clients and lays the foundation for AI-powered workflow automation.

Remove humans from the permission-granting loop by implementing configuration-as-code for access control. Build multi-layered fail-safe controls using conditional access policies at both the service provider and client tenant levels, combined with unified RBAC in Defender.

Create a centralized repository (monorepo) to manage detections, policies, onboarding procedures, and permissions across all tenants.

Use a parameters database to store tenant-specific variables, preventing hard-coded values in detection logic and enabling scalable change management.

1. Never hard-code values into detection rules; use parameter files instead.
    
2. Be generous with matching logic (use "is not empty" rather than exact values).
    
3. Design detections to gracefully handle missing fields or tables when connectors fail.
    
While MTO provides multi-tenant visibility and shared incident queues, Microsoft doesn't offer operational models for staffing, identity management, or configuration-as-code frameworks. You'll need to build your own blueprints for drift detection, fleet layer intelligence, governance orchestration, and feedback optimization.

When addressing CISO concerns about tenant commingling, emphasize that multi-tenant operations use federation (maintaining autonomy) rather than integration (combining systems). Each tenant retains its own policies, data boundaries, and response action controls.

The same CI/CD pipeline and automation framework can serve multiple use cases: detections, onboarding, policy deployments, permissions management, and change control. This reduces duplicative infrastructure across different IT teams.

Implement automated "cadence engines" (cron jobs) to continuously verify connector health, detection rule integrity, and configuration drift across all tenants because manually logging into 50+ tenants isn't feasible.

The infrastructure patterns for multi-tenant security operations often mirror what identity teams, help desks, and other IT functions need. Presenting unified configuration-as-code approaches can demonstrate cost savings and efficiency gains across the entire organization.

Thank you, Mona, for these gems!

![Mona Talk]({{ site.url }}{{ site.baseurl }}/assets/images/monaSlide1.png)

![Mona Talk]({{ site.url }}{{ site.baseurl }}/assets/images/monaSlide2.png)

## Neourdiversity in Tech

To top it all off, I was able to sit in on a presentation about the highs and lows of being neurospicy and how other neurodivergent folks can navigate them in the tech space. There is nothing to be ashamed of; embrace it. It’s a superpower, not a crutch.

## Conclusion

This conference had a lot of great people, amazing talks, and even satisfying food. I really enjoyed myself! If anyone wants to come to the next one, there will be another Workplace Ninjas US conference in Arizona in February 2027. Here are some flicks during the conference!

![Scholorship Winners!]({{ site.url }}{{ site.baseurl }}/assets/images/scholorshipWinners.png)

![Golden Clippy Award winners!]({{ site.url }}{{ site.baseurl }}/assets/images/goldenClippy.png)

![Last night in Dallas]({{ site.url }}{{ site.baseurl }}/assets/images/lastPic.png)