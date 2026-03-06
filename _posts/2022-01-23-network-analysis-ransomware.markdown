---
layout: post
title: "Network Analysis ~ Ransomware"
date: 2022-01-23 16:55:59 +0000
categories: Cybersecurity
tags: [labs]
author: admin
---

Ransomware remains one of the most prevalent cybersecurity threats globally. It's malware designed to deny legitimate users access to their systems and demand payment (a "ransom") for restoration. There are several types of ransomware, including:

- **Crypto ransomware** - Encrypts user data
- **Lockers** - Lock users out of systems
- **Scareware** - Deceives users into paying
- **Doxware/Leakware** - Threatens to publish stolen data
- **RaaS (Ransomware as a Service)** - Commodity ransomware offered as a service

This particular challenge analyzed a Trojan-based ransomware. While the challenge is still active and I cannot share specific answers, I can walk you through my methodology.

## Finding Initial Clues

The first three questions were answered by analyzing the PCAP file provided in the ZIP file. You can open PCAP files using WireShark. For the initial question about Capture File Properties, I had to research what this meant using online resources.

## Analyzing the Executable

For the subsequent questions, I researched the suspicious executable using [Intezer's genetic analysis tool](https://analyze.intezer.com/), which provided detailed insights into the malware's behavior and characteristics.

## Decryption Challenge

For the final question, I had to decrypt a macro file. Since the original decryption tool is no longer available, I used a master key released in 2016 with a decoder. [This YouTube tutorial](https://www.youtube.com/watch?v=lYDynn3MUi0) was extremely helpful for visual learners.
