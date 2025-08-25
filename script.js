class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('terminal-input');
        this.commands = {
            'help': this.showHelp.bind(this),
            'whoami': this.whoami.bind(this),
            'about': this.about.bind(this),
            'skills': this.skills.bind(this),
            'tools': this.tools.bind(this),
            'clear': this.clear.bind(this),
            'date': this.date.bind(this),
            'matrix': this.matrix.bind(this),
            'social': this.social.bind(this),
            'art': this.art.bind(this),
            'universe': this.universe.bind(this),
            'notes': this.notes.bind(this),
            'ls': this.ls.bind(this),
            'cat': this.cat.bind(this),
            'echo': this.echo.bind(this),
            'history': this.history.bind(this),
            'theme': this.theme.bind(this)
        };
        this.commandHistory = [];
        this.historyIndex = -1;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });

        // Keep focus on input
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }

    processCommand() {
        const command = this.input.value.trim();
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            
            this.addToOutput(`<span class="prompt">artist@universe:~$</span> ${command}`, 'line');
            
            const [cmd, ...args] = command.toLowerCase().split(' ');
            
            if (this.commands[cmd]) {
                this.commands[cmd](args);
            } else {
                this.addToOutput(`Command '${cmd}' not found. Type 'help' for available commands.`, 'response error');
            }
        }
        
        this.input.value = '';
        this.scrollToBottom();
    }

    addToOutput(content, className = 'response') {
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = content;
        this.output.appendChild(div);
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }

    // Command implementations
    showHelp() {
        this.addToOutput('Available Commands:', 'response success');
        this.addToOutput('');
        this.addToOutput('whoami      - Display user information');
        this.addToOutput('about       - Learn about me');
        this.addToOutput('skills      - View my technical skills');
        this.addToOutput('tools       - Cloud security tools & resources');
        this.addToOutput('social      - View social media links');
        this.addToOutput('notes       - Access my knowledge base & notes');
        this.addToOutput('art         - Display ASCII art');
        this.addToOutput('universe    - Explore the artist universe');
        this.addToOutput('ls          - List directory contents');
        this.addToOutput('cat [file]  - Display file contents');
        this.addToOutput('echo [text] - Display text');
        this.addToOutput('history     - Show command history');
        this.addToOutput('date        - Show current date and time');
        this.addToOutput('matrix      - Enter the matrix...');
        this.addToOutput('theme       - Change terminal theme');
        this.addToOutput('clear       - Clear the terminal');
        this.addToOutput('help        - Show this help message');
        this.addToOutput('');
        this.addToOutput('Pro tip: Use arrow keys to navigate command history!', 'response info');
        this.addToOutput('Try \'ls\' to see available files, then \'cat [filename]\' to view them!', 'response info');
    }

    whoami() {
        this.addToOutput('Status: A sophisticated mofo who likes all things different');
        this.addToOutput('Location: The Internet');
    }

    about() {
        this.addToOutput('Waddup!', 'response success');
        this.addToOutput('');
        this.addToOutput('I\'m Artist, a cybersecurity consultant and creative explorer based in Atlanta.');
        this.addToOutput('By day, I focus on threat detection, cloud security, and automation—bringing');
        this.addToOutput('both strategy and hands-on engineering to help organizations stay secure.');
        this.addToOutput('By night, I\'m chasing curiosity: experimenting in my homelab, editing videos,');
        this.addToOutput('traveling, and documenting the journey.');
        this.addToOutput('');
        this.addToOutput('I\'m driven by both resilience and imagination. My Jamaican-Brooklyn roots');
        this.addToOutput('ground me, while my work in tech pushes me to keep learning, questioning,');
        this.addToOutput('and building what\'s next. At the core, I\'m passionate about blending');
        this.addToOutput('technical problem-solving with storytelling—whether that\'s engineering');
        this.addToOutput('security in the cloud, or sharing experiences that inspire connection');
        this.addToOutput('and growth.');
        this.addToOutput('');
        this.addToOutput('💡 Check out my notes and documentation with the \'notes\' command!', 'response info');
        this.addToOutput('');
        this.addToOutput('"Music is poetry in motion" - The Artist Universe Motto', 'response info');
    }

    skills() {
        this.addToOutput('Technical Skills', 'response success');
        this.addToOutput('');
        this.addToOutput('Cloud Security & Infrastructure:', 'response info');
        this.addToOutput('• Microsoft 365 & Azure     ████████████ 95%');
        this.addToOutput('• Amazon Web Services (AWS) ██████████   85%');
        this.addToOutput('• Terraform/IaC             █████        50%');
        this.addToOutput('');
/*        this.addToOutput('Threat Detection & Protection:', 'response info');
        this.addToOutput('• SIEM/SOAR Platforms       ████████████ 95%');
        this.addToOutput('• Splunk/Elastic Stack      ██████████   85%');
        this.addToOutput('• EDR/XDR Solutions         █████████    90%');
        this.addToOutput('• Threat Intelligence       ████████     80%');
        this.addToOutput('• Incident Response         ██████████   85%');
        this.addToOutput('');
        this.addToOutput('DevSecOps & Automation:', 'response info');
        this.addToOutput('• Python Security Scripts   ████████████ 95%');
        this.addToOutput('• Bash/PowerShell           ██████████   85%');
        this.addToOutput('• CI/CD Security            █████████    90%');
        this.addToOutput('• GitLab/GitHub Actions     ████████     80%');
        this.addToOutput('• Security as Code          ██████████   85%');
        this.addToOutput('');
        this.addToOutput('Security Tools & Frameworks:', 'response info');
        this.addToOutput('• Nessus/Qualys/OpenVAS');
        this.addToOutput('• Burp Suite/OWASP ZAP');
        this.addToOutput('• Nmap/Metasploit');
        this.addToOutput('• Wireshark/tcpdump');
        this.addToOutput('• MITRE ATT&CK Framework');
        this.addToOutput('');
        this.addToOutput('Programming & Scripting:', 'response info');
        this.addToOutput('• Python                    ████████████ 95%');
        this.addToOutput('• Bash/Shell Scripting      ██████████   85%');
        this.addToOutput('• PowerShell                ████████     80%');
        this.addToOutput('• JavaScript                █████████    90%');
        this.addToOutput('• Go/Rust                   ██████       60%');
        this.addToOutput('');
        this.addToOutput('Certifications & Standards:', 'response info');
        this.addToOutput('• AWS Certified Security - Specialty');
        this.addToOutput('• CompTIA Security+');
        this.addToOutput('• NIST Cybersecurity Framework');
        this.addToOutput('• ISO 27001/SOC 2 Compliance');
        this.addToOutput('• CIS Controls Implementation'); */
    }

    tools() {
        this.addToOutput('☁️ Cloud Security Arsenal', 'response success');
        this.addToOutput('');
        this.addToOutput('🛡️ Cloud Security Platforms:', 'response info');
        this.addToOutput('• <a href="https://aws.amazon.com/security-hub/" target="_blank">AWS Security Hub</a> - Centralized security findings dashboard');
        this.addToOutput('• <a href="https://cloud.google.com/security-command-center" target="_blank">Google Cloud Security Command Center</a> - Unified security management');
        this.addToOutput('• <a href="https://azure.microsoft.com/en-us/products/defender-for-cloud/" target="_blank">Microsoft Defender for Cloud</a> - Multi-cloud security posture management');
        this.addToOutput('');
        this.addToOutput('🔍 Cloud Assessment & Compliance:', 'response info');
        this.addToOutput('• <a href="https://github.com/prowler-cloud/prowler" target="_blank">Prowler</a> - Open source cloud security tool');
        this.addToOutput('• <a href="https://github.com/Netflix/security_monkey" target="_blank">Security Monkey</a> - AWS security configuration monitoring');
        this.addToOutput('• <a href="https://github.com/aquasecurity/cloudsploit" target="_blank">CloudSploit</a> - Cloud security configuration scanner');
        this.addToOutput('• <a href="https://github.com/RhinoSecurityLabs/pacu" target="_blank">Pacu</a> - AWS exploitation framework');
        this.addToOutput('');
        this.addToOutput('🔐 Identity & Access Management:', 'response info');
        this.addToOutput('• <a href="https://github.com/salesforce/cloudsplaining" target="_blank">Cloudsplaining</a> - AWS IAM security assessment');
        this.addToOutput('• <a href="https://github.com/nccgroup/PMapper" target="_blank">PMapper</a> - AWS IAM privilege escalation analysis');
        this.addToOutput('• <a href="https://github.com/cyberark/SkyArk" target="_blank">SkyArk</a> - Azure security assessment tool');
        this.addToOutput('');
        this.addToOutput('🏗️ Infrastructure as Code Security:', 'response info');
        this.addToOutput('• <a href="https://www.checkov.io/" target="_blank">Checkov</a> - Static analysis for Terraform, CloudFormation, Kubernetes');
        this.addToOutput('• <a href="https://github.com/Checkmarx/kics" target="_blank">KICS</a> - Infrastructure as code scanner');
        this.addToOutput('• <a href="https://github.com/aquasecurity/tfsec" target="_blank">tfsec</a> - Terraform security scanner');
        this.addToOutput('');
        this.addToOutput('📊 Monitoring & SIEM:', 'response info');
        this.addToOutput('• <a href="https://docs.aws.amazon.com/cloudtrail/" target="_blank">AWS CloudTrail</a> - API activity logging and monitoring');
        this.addToOutput('• <a href="https://www.elastic.co/security" target="_blank">Elastic Security</a> - SIEM and endpoint protection platform');
        this.addToOutput('• <a href="https://grafana.com/" target="_blank">Grafana</a> - Observability and monitoring dashboards');
        this.addToOutput('');
        this.addToOutput('💡 "Security is not a product, but a process" - Bruce Schneier', 'response success');
    }

    social() {
        this.addToOutput('Are you one of those people who follows to unfollow?', 'response success');
        this.addToOutput('');
        this.addToOutput('🐙 GitHub: <a href="https://github.com/ArtistYay" target="_blank">https://github.com/ArtistYay</a>');
        this.addToOutput('💼 LinkedIn: <a href="https://www.linkedin.com/in/athinat/" target="_blank">linkedin.com/in/athinat</a>');
        this.addToOutput('📸 Instagram: <a href="https://www.instagram.com/artistyay/" target="_blank">@artistyay</a>');
        this.addToOutput('📝 Hashnode: <a href=https://artistuniverse.hashnode.dev/" target="_blank">hashnode.com/@artistyay</a>');
        this.addToOutput('🎥 YouTube: <a href="https://www.youtube.com/@ArtistUniverseUntouched" target="_blank">youtube.com/@artistyay</a>');
        this.addToOutput('');
        this.addToOutput('Follow for updates in real time!', 'response info');
    }

    notes() {
        this.addToOutput('📚 Knowledge Base & Documentation', 'response success');
        this.addToOutput('');
        this.addToOutput('Welcome to my digital brain! Here you\'ll find my notes, learnings,');
        this.addToOutput('and documentation from my journey as someone who is interested in cybersecurity (I\'m no expert).');
        this.addToOutput('');
        this.addToOutput('🧠 What\'s Inside:', 'response info');
        this.addToOutput('• My L\'s');
        this.addToOutput('• What I\'v learned or is currently learning');
        this.addToOutput('• Project documentation');
        this.addToOutput('');
        this.addToOutput('🔗 Quick Redirect:', 'response success');
        this.addToOutput('Auto-redirect will open the notes in 5 seconds');
        this.addToOutput('');
        this.addToOutput('💡 Pro tip: My notes are built with MkDocs from Obsidian!', 'response info');
        this.addToOutput('Happy learning! 🚀', 'response success');
        
        // Optional: Auto-redirect after showing info
        setTimeout(() => {
            this.addToOutput('');
            this.addToOutput('🔄 Opening notes in new tab in 5 seconds...', 'response info');
            this.addToOutput('Type \'clear\' to cancel or wait for redirect.');
            setTimeout(() => {
                window.open('https://notes.artistuniverse.tech', '_blank');
                this.addToOutput('✅ Notes opened in new tab!', 'response success');
            }, 5000);
        }, 1000);
    }

    art() {
        const artPieces = [
            `
     ╭─────────────────────╮
     │ ✦ DIGITAL COSMOS ✦ │
     ╰─────────────────────╯
           ✦       ✧
        ✧    ⭐    ✦
           ✦     ✧
            ⭐
        `,
            `
    ┌─ CODE POETRY ─┐
    │ if (art) {    │
    │   create();   │
    │   inspire();  │
    │   repeat();   │
    │ }             │
    └───────────────┘
        `,
            `
    ★ CONSTELLATION CODE ★
    ┌─────────────────────┐
    │  ·   ★       ·  ★   │
    │    ·    ★   ·       │
    │ ★     ·         ·   │
    │   ·        ★     ·  │
    │     ★   ·      ★    │
    │ ·      ·   ★    ·   │
    └─────────────────────┘
     CONNECTED BY CODE
        `,
            `
    ╔═ RETRO COMPUTER ═╗
    ║ ┌───────────────┐ ║
    ║ │ > HELLO WORLD │ ║
    ║ │ > _           │ ║
    ║ │               │ ║
    ║ └───────────────┘ ║
    ║ [POWER] [RESET]   ║
    ╚═══════════════════╝
        `,
            `
🔥 CHARIZARD 🔥
                 ."-,.__
                 \`.     \`.  ,
              .--'  .._,'"-' \`.
             .    .'         \`'
             \`.   /          ,'
               \`  '--.   ,-"'
                \`"\`   |  \\
                   -. \\, |
                    \`--Y.'      ___.
                         \\     L._, \\
               _.,        \`.   <  <\\                _
             ,' '           \`, \`.   | \\            ( \`
          ../, \`.            \`  |    .\\.\`.           \\ \\_
         ,' ,..  .           _.,'    ||\\l            )  '".
        , ,'   \\           ,'.-.\\-._,'  |           .  _._\`.
      ,' /      \\ \\        \`' ' --/   | \\          / /   ..\\
    .'  /        \\ .         |\\__ - _ ,'\` \`        / /     \`.\`.
    |  '          ..         \`-...-"  |  \`-'      / /        . \`.
    | /           |L__           |    |          / /          \`. \`.
   , /            .   .          |    |         / /             \` \`
  / /          ,. ,\`.\_ \`-_       |    |  _   ,-' /               \` \\
 / .           \\"\`_/. \`-_ \\_,.  ,'    +-' \`-'  _,        ..,-.    \\\`.
.  '         .-f    ,'   \`    '.       \\__.---'     _   .'   '     \\ \\
' /          \`.'    l     .' /          \\..      ,_|/   \`.  ,'\`     L\`
|'      _.-""\` \`.    \\ _,'  \`            \\ \`.___\`.'"\`-.  , |   |    | \\
||    ,'      \`. \`.   '       _,...._        \`  |    \`/ '  |   '     .|
||  ,'          \`. ;.,.---' ,'       \`.   \`.. \`-'  .-' /_ .'    ;_   ||
|| '              V      / /           \`   | \`   ,'   ,' '.    !  \`. ||
||/            _,-------7 '              . |  \`-'    l         /    \`||
. |          ,' .-   ,' ||               | .-.        \`.      .'     ||
 \`'        ,'    \`".'    |               |    \`.        '. -.'       \`'
          /      ,'      |               |,'    \\-.._,.'/'
          .     /        .               .       \\    .''
        .\`.    |         \`.             /         :_,'.'
          \\ \`...\\   _     ,'-.        .'         /_.-'
           \`-.__ \`,  \`'   .  _.>----''.  _  __  /
                .'        /"'          |  "'   '_
               /_|.-'\\ ,".             '.'\`__'-( \\
                 / ,"'"\\,'               \`/  \`-.|"

             FIRE TYPE LEGEND
        `,
            `
🐐 GOAT 🐐
             ,--._,--.
           ,'  ,'   ,-\`.
(\`-.__    /  ,'   /
 \`.   \`--'        \\__,--'-.
   \`--/       ,-.  ______/
     (o-.     ,o- /
      \`. ;        \\
       |:          \\
      ,'\`       ,   \\
     (o o ,  --'     :
      \\--','.        ;
       \`;;  :       /
 -hrr-  ;'  ;  ,' ,'
        ,','  :  '
        \\ \\   :
         \`

      GREATEST OF ALL TIME
        `,
            `
🦑 SQUIDWARD 🦑
        .--'''''''''--.
     .'      .---.      '.
    /    .-----------.    \\
   /        .-----.        \\
   |       .-.   .-.       |
   |      /   \\ /   \\      |
    \\    | .-. | .-. |    /
     '-._| | | | | | |_.-'
         | '-' | '-' |
          \\___/ \\___/
       _.-'  /   \\  \`-._
     .' _.--|     |--._ '.
     ' _...-|     |-..._ '
            |     |
            '.___.'
              | |
             _| |_
            /\\( )/\\
           /  \` '  \\
          | |     | |
          '-'     '-'
          | |     | |
          | |     | |
          | |-----| |
       .\`/  |     | |\`/.
       |    |     |    |
       '._.'| .-. |'._.'
             \\ | /
             | | |
             | | |
             | | |
            /| | |\\
          .'_| | |_\`.
LGB       \`. | | | .'
       .    /  |  \\    .
      /o\`.-'  / \\  \`-.\`o\\
     /o  o\\ .'   \`. /o  o\\
     \`.___.'       \`.___.'

     CLARINET VIRTUOSO
        `,
            `
🧪 PERIODIC TABLE 🧪
  -----                                                               -----
1 | H |                                                               |He |
  |---+----                                       --------------------+---|
2 |Li |Be |                                       | B | C | N | O | F |Ne |
  |---+---|                                       |---+---+---+---+---+---|
3 |Na |Mg |3B  4B  5B  6B  7B |    8B     |1B  2B |Al |Si | P | S |Cl |Ar |
  |---+---+---------------------------------------+---+---+---+---+---+---|
4 | K |Ca |Sc |Ti | V |Cr |Mn |Fe |Co |Ni |Cu |Zn |Ga |Ge |As |Se |Br |Kr |
  |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|
5 |Rb |Sr | Y |Zr |Nb |Mo |Tc |Ru |Rh |Pd |Ag |Cd |In |Sn |Sb |Te | I |Xe |
  |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|
6 |Cs |Ba |LAN|Hf |Ta | W |Re |Os |Ir |Pt |Au |Hg |Tl |Pb |Bi |Po |At |Rn |
  |---+---+---+------------------------------------------------------------
7 |Fr |Ra |ACT|
  -------------
              -------------------------------------------------------------
   Lanthanide |La |Ce |Pr |Nd |Pm |Sm |Eu |Gd |Tb |Dy |Ho |Er |Tm |Yb |Lu |
              |---+---+---+---+---+---+---+---+---+---+---+---+---+---+---|
   Actinide   |Ac |Th |Pa | U |Np |Pu |Am |Cm |Bk |Cf |Es |Fm |Md |No |Lw |
              -------------------------------------------------------------

        ELEMENTS OF CODING
        `,
            `
🤖 ROBOT 🤖
          .  .
          |\\_|\\
          | a_a\\
          | | "]
      ____| '-\\___
     /.----.___.-'\\
    //        _    \\
   //   .-. (~v~) /|
  |'|  /\\:  .--  / \\
 // |-/  \\_/____/\\/~|
|/  \\ |  []_|_|_] \\ |
| \\  | \\ |___   _\\ ]_}
| |  '-' /   '.'  |
| |     /    /|:  | 
| |     |   / |:  /\\
| |     /  /  |  /  \\
| |    |  /  /  |    \\
\\ |    |\\/\\/  |\\/|/\\    \\
 \\|\\ |\\|  |  | / /\\/\\__\\
  \\ \\| | /   | |__
snd    / |   |____)
       |_/

    BY SHANAKA DIAS
        `,
            `
🎮 PS2 CONTROLLER 🎮
      _=====_                               _=====_
     / _____ \\                             / _____ \\
   +.-'_____'-.---------------------------.-'_____'-.+
  /   |     |  '.        S O N Y        .'  |  _  |   \\
 / ___| /|\\ |___ \\                     / ___| /_\\ |___ \\
/ |      |      | ;  __           _   ; | _         _ | ;
| | <---   ---> | | |__|         |_:> | ||_|       (_)| |
| |___   |   ___| ;SELECT       START ; |___       ___| ;
|\\    | \\|/ |    /  _     ___      _   \\    | (X) |    /|
| \\   |_____|  .','" "', |___|  ,'" "', '.  |_____|  .' |
|  '-.______.-' /       \\ANALOG/       \\  '-._____.-'   |
|               |       |------|       |                |
|              /\\       /      \\       /\\               |
|             /  '.___.'        '.___.'  \\              |
|            /                            \\             |
 \\          /                              \\           /
  \\________/                                \\_________/

           GAMING NOSTALGIA
        `
        ];
        
        const randomArt = artPieces[Math.floor(Math.random() * artPieces.length)];
        this.addToOutput(`<pre class="ascii-art">${randomArt}</pre>`);
    }

    universe() {
        this.addToOutput('🌌 Welcome to the Artist Universe 🌌', 'response success');
        this.addToOutput('');
        this.addToOutput('In this digital realm, creativity knows no bounds...');
        this.addToOutput('');
        this.addToOutput('<pre class="ascii-art">');
        this.addToOutput('    ⭐ ─── ✦ ─── ⭐ ─── ✧ ─── ⭐');
        this.addToOutput('        │               │');
        this.addToOutput('        │   EXPLORE     │');
        this.addToOutput('        │   CREATE      │');
        this.addToOutput('        │   INSPIRE     │');
        this.addToOutput('        │               │');
        this.addToOutput('    ⭐ ─── ✧ ─── ⭐ ─── ✦ ─── ⭐');
        this.addToOutput('</pre>');
        this.addToOutput('');
        this.addToOutput('This universe contains:', 'response info');
        this.addToOutput('• Infinite creative possibilities');
        this.addToOutput('• Collaborative spaces');
        this.addToOutput('• Digital art galleries');
        this.addToOutput('• Interactive experiences');
        this.addToOutput('• Community connections');
        this.addToOutput('');
        this.addToOutput('Type any command to continue exploring! 🚀');
    }

    ls() {
        this.addToOutput('-rw-r--r--  resume.pdf');
        this.addToOutput('');
        this.addToOutput('💡 Use \'notes\' command to access the knowledge base', 'response info');
        this.addToOutput('📄 Use \'cat resume.pdf\' to view my resume', 'response info');
    }

    cat(args) {
        const file = args[0];
        const files = {
            'readme.md': 'Welcome to Artist Universe - Where creativity meets code!',
            'portfolio.json': '{"name": "Artist Universe", "type": "Creative Developer", "passion": "Digital Art"}',
            'creative-brief.txt': 'Mission: Create digital experiences that inspire and engage users through innovative technology.',
            'inspiration.md': '# Daily Inspiration\n\n"The best way to predict the future is to create it." - Peter Drucker',
            'notes': '🔗 Symbolic link to: https://notes.artistuniverse.tech\n\nThis is my knowledge base built with MkDocs from Obsidian notes.\nUse the "notes" command for full access.'
        };
        
        if (file && (files[file.toLowerCase()] || file.toLowerCase() === 'resume.pdf')) {
            this.addToOutput(`Contents of ${file}:`, 'response success');
            
            if (file.toLowerCase() === 'resume.pdf') {
                // Special handling for resume to output line by line
                this.displayResume();
            } else {
                this.addToOutput(files[file.toLowerCase()]);
            }
        } else if (file) {
            this.addToOutput(`cat: ${file}: No such file or directory`, 'response error');
        } else {
            this.addToOutput('Usage: cat [filename]', 'response info');
        }
    }

    displayResume() {
        // Header
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
        this.addToOutput('                        ATHINA THOMAS                         ', 'response success');
        this.addToOutput('                Cybersecurity Specialist (Cloud)             ', 'response success');
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
        this.addToOutput('');

        // Professional Summary
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('PROFESSIONAL SUMMARY', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('As a results-driven Cloud Security Engineer with two years of experience,');
        this.addToOutput('I am adept at securing Azure and Microsoft 365 environments. My expertise');
        this.addToOutput('lies in implementing cloud-native security solutions, reducing vulnerabilities,');
        this.addToOutput('and ensuring compliance with industry best practices. I have a proven track');
        this.addToOutput('record of securing CI/CD pipelines and automating infrastructure provisioning');
        this.addToOutput('with Terraform. My experience includes leveraging tools like Microsoft');
        this.addToOutput('Defender Suite and Microsoft Sentinel to proactively identify and mitigate');
        this.addToOutput('threats. I am passionate about codifying security into every stage of the');
        this.addToOutput('cloud lifecycle, from Infrastructure as Code (IaC) to incident response,');
        this.addToOutput('to deliver proactive defenses and measurable risk reduction. I am seeking');
        this.addToOutput('a challenging and rewarding security role where I can leverage my skills');
        this.addToOutput('to protect digital assets and build resilient cloud architectures.');
        this.addToOutput('');
        
        // Technical Skills
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('TECHNICAL SKILLS', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Cloud Platforms:', 'response success');
        this.addToOutput('• Microsoft Azure       • Amazon Web Services (AWS)');
        this.addToOutput('');
        this.addToOutput('Security Tools & Platforms:', 'response success');
        this.addToOutput('• Microsoft Defender Suite    • Microsoft Sentinel');
        this.addToOutput('• Microsoft Purview           • Microsoft Intune');
        this.addToOutput('• Microsoft Entra ID          • AWS GuardDuty          • AWS IAM');
        this.addToOutput('');
        this.addToOutput('Infrastructure & DevSecOps:', 'response success');
        this.addToOutput('• Terraform              • Infrastructure as Code  • CI/CD Security');
        this.addToOutput('• Azure DevOps           • GitHub Actions         • Git');
        this.addToOutput('• GitHub                 • Bicep                  • AWS CloudFormation');
        this.addToOutput('');
        this.addToOutput('Security Frameworks & Compliance:', 'response success');
        this.addToOutput('• NIST Cybersecurity Framework (CSF)');
        this.addToOutput('• Center for Internet Security (CIS) Benchmark');
        this.addToOutput('• MITRE ATT&CK Framework');
        this.addToOutput('• Azure Cloud Adoption Framework (CAF)');
        this.addToOutput('');
     /*   this.addToOutput('Programming & Scripting:', 'response success');
        this.addToOutput('• PowerShell             • Python (Security)      • Bash');
        this.addToOutput('• KQL (Kusto Query)      • JSON/YAML             • REST APIs');
        this.addToOutput(''); */
        
        // Experience
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('EXPERIENCE', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Associate Cloud Security Consultant | 2022 - Present', 'response success');
        this.addToOutput('• Led a phased patching schedule that resulted in the remediation of over');
        this.addToOutput('  94,000 vulnerabilities, reducing a client\'s security risk by 73%');
        this.addToOutput('• Migrated Azure government workloads to a cost-effective commercial');
        this.addToOutput('  environment, reducing cloud expenses while enhancing security');
        this.addToOutput('• Led Entra ID MFA modernization, transitioning users from legacy');
        this.addToOutput('  authentication to secure identity management');
        this.addToOutput('• Developed custom CIS benchmark templates for Microsoft Intune to');
        this.addToOutput('  align with security standards');
        this.addToOutput('• Implemented Microsoft Purview Information Protection strategies for');
        this.addToOutput('  financial institutions, including DLP policies, Sensitivity Label');
        this.addToOutput('  Encryption, and data classification');
        this.addToOutput('• Conducted security assessments and hardening across various industries,');
        this.addToOutput('  ensuring alignment with best practices and regulatory frameworks');
        this.addToOutput('');
        this.addToOutput('Tier 1 Security Operations Center (SOC) Analyst | 2021-2022', 'response success');
        this.addToOutput('• Investigated and mitigated over 277 security incidents, including AWS');
        this.addToOutput('  login anomalies, firewall alerts, and endpoint detections');
        this.addToOutput('• Automated security workflows using Demisto (SOAR), which significantly');
        this.addToOutput('  reduced the Mean Time to Resolution (MTTR) for security incidents');
        this.addToOutput('• Developed phishing playbooks within SOAR to streamline security');
        this.addToOutput('  response and reduce resolution time');
        this.addToOutput('• Conducted threat analysis on detections from SentinelOne, Carbon Black,');
        this.addToOutput('  FireEye, and Palo Alto, refining detection rules to reduce false positives');
        this.addToOutput('• Migrated over 60 Splunk alerts, maintaining continuous log collection');
        this.addToOutput('  and security event visibility');
        this.addToOutput('');
        
        // Featured Projects
/*        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('FEATURED PROJECTS', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('🎨 Interactive Art Gallery', 'response success');
        this.addToOutput('   Web-based virtual gallery with 3D navigation and immersive experiences');
        this.addToOutput('   Tech: Three.js, WebGL, React | Status: Live');
        this.addToOutput('');
        this.addToOutput('🤖 AI Art Generator', 'response success');
        this.addToOutput('   Machine learning powered artwork creation platform');
        this.addToOutput('   Tech: Python, TensorFlow, Flask | Status: Development');
        this.addToOutput('');
        this.addToOutput('🎵 Music Visualizer', 'response success');
        this.addToOutput('   Real-time audio visualization in the browser');
        this.addToOutput('   Tech: Web Audio API, Canvas, JavaScript | Status: Live');
        this.addToOutput('');
        this.addToOutput('📝 Digital Poetry Platform', 'response success');
        this.addToOutput('   Interactive platform for digital poetry and creative writing');
        this.addToOutput('   Tech: Vue.js, Node.js, MongoDB | Status: Beta');
        this.addToOutput(''); */
        
        // Education
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('EDUCATION & CERTIFICATIONS', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Bachelor of Science in Cloud Computing | 2024 - Present', 'response success');
        this.addToOutput('Western Governors University');
        this.addToOutput('');
        this.addToOutput('Certifications:', 'response success');
        this.addToOutput('• AWS Certified Security - Specialty');
        this.addToOutput('• Microsoft Certified: DevOps Engineer Expert (AZ-400)');
        this.addToOutput('• Microsoft Certified: Azure Developer Associate (AZ-204)');
        this.addToOutput('• Microsoft Certified: Azure Administrator Associate (AZ-104)');
        this.addToOutput('• HashiCorp Certified: Terraform Associate (003)');
        this.addToOutput('• CompTIA Cloud+');
        this.addToOutput('• CompTIA Security+');
        this.addToOutput('• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)');
        this.addToOutput('• Microsoft Certified: Azure AI Fundamentals (AI-900)');
        this.addToOutput('• Coursera Google IT Support');
        this.addToOutput('');
        
        // Achievements
/*        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('ACHIEVEMENTS & RECOGNITION', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('• Featured in "Top 30 Under 30" Creative Technologists (2023)');
        this.addToOutput('• Winner - Digital Art Innovation Award (2022)');
        this.addToOutput('• Speaker at CreativeTech Conference (2021, 2022, 2023)');
        this.addToOutput('• 20+ articles published on creative coding and digital art');
        this.addToOutput('• Open source contributions: 500+ GitHub stars across projects');
        this.addToOutput(''); */
        
        // Footer
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
        this.addToOutput('💡 "Music is poetry in motion" - Artist Universe Motto', 'response info');
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
    }

    echo(args) {
        const text = args.join(' ');
        this.addToOutput(text || '');
    }

    history() {
        this.addToOutput('<span class="response success">Command History:</span>');
        this.commandHistory.forEach((cmd, index) => {
            this.addToOutput(`  ${index + 1}  ${cmd}`);
        });
    }

    date() {
        const now = new Date();
        this.addToOutput('Current Date & Time:', 'response success');
        this.addToOutput(now.toString());
    }

    matrix() {
        this.addToOutput(`
<span class="response success">Entering the Matrix...</span>

<span class="response error">Wake up, Neo...</span>
        `);
        this.createMatrixEffect();
    }

    createMatrixEffect() {
        const matrix = document.createElement('div');
        matrix.className = 'matrix-rain';
        document.body.appendChild(matrix);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDuration = (Math.random() * 3 + 2) + 's';
                matrix.appendChild(char);

                setTimeout(() => {
                    char.remove();
                }, 5000);
            }, i * 100);
        }

        setTimeout(() => {
            matrix.remove();
        }, 5000);
    }

    theme(args) {
        const themes = {
            'matrix': () => {
                document.documentElement.style.setProperty('--primary-color', '#00ff00');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(0, 255, 0, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(0, 255, 0, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(0, 255, 0, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(0, 255, 0, 0.2)');
            },
            'cyberpunk': () => {
                document.documentElement.style.setProperty('--primary-color', '#ff00ff');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(255, 0, 255, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(255, 0, 255, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(255, 0, 255, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(255, 0, 255, 0.2)');
            },
            'ocean': () => {
                document.documentElement.style.setProperty('--primary-color', '#00ffff');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(0, 255, 255, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(0, 255, 255, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(0, 255, 255, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(0, 255, 255, 0.2)');
            },
            'fire': () => {
                document.documentElement.style.setProperty('--primary-color', '#ff4500');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(255, 69, 0, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(255, 69, 0, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(255, 69, 0, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(255, 69, 0, 0.2)');
            },
            'amber': () => {
                document.documentElement.style.setProperty('--primary-color', '#ffb000');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(255, 176, 0, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(255, 176, 0, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(255, 176, 0, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(255, 176, 0, 0.2)');
            },
            'default': () => {
                document.documentElement.style.setProperty('--primary-color', '#00ff00');
                document.documentElement.style.setProperty('--primary-glow', 'rgba(0, 255, 0, 0.1)');
                document.documentElement.style.setProperty('--primary-border', 'rgba(0, 255, 0, 0.3)');
                document.documentElement.style.setProperty('--primary-dim', 'rgba(0, 255, 0, 0.05)');
                document.documentElement.style.setProperty('--primary-bright', 'rgba(0, 255, 0, 0.2)');
            }
        };

        const theme = args[0];
        if (theme && themes[theme]) {
            themes[theme]();
            this.addToOutput(`Theme changed to: ${theme}`, 'response success');
        } else {
            this.addToOutput(`
<span class="response info">Available themes:</span>
${Object.keys(themes).join(', ')}

<span class="response info">Usage:</span>
theme [theme-name]
            `, 'response info');
        }
    }

    clear() {
        this.output.innerHTML = '';
        this.addToOutput(`<span class="prompt">artist@universe:~$</span> clear`, 'line');
        this.addToOutput('Terminal cleared. Type "help" for available commands.');
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});

// Add some CSS custom properties for theming
document.documentElement.style.setProperty('--primary-color', '#00ff00');
