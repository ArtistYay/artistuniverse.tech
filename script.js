class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('terminal-input');
        this.commands = {
            'help': this.showHelp.bind(this),
            'whoami': this.whoami.bind(this),
            'about': this.about.bind(this),
            'skills': this.skills.bind(this),
            'projects': this.projects.bind(this),
            'contact': this.contact.bind(this),
            'clear': this.clear.bind(this),
            'date': this.date.bind(this),
            'matrix': this.matrix.bind(this),
            'social': this.social.bind(this),
            'art': this.art.bind(this),
            'universe': this.universe.bind(this),
            'notes': this.notes.bind(this),
            'docs': this.notes.bind(this),
            'knowledge': this.notes.bind(this),
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
        this.addToOutput('projects    - See my projects');
        this.addToOutput('contact     - Get contact information');
        this.addToOutput('social      - View social media links');
        this.addToOutput('notes       - Access my knowledge base & notes');
        this.addToOutput('docs        - Alias for notes command');
        this.addToOutput('knowledge   - Explore my documented learnings');
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
        const aboutText = `
<span class="response success">About Me</span>

I'm a passionate digital artist and creative developer who believes in 
pushing the boundaries of what's possible with code and creativity.

My mission is to bridge the gap between technology and art, creating
immersive digital experiences that inspire and engage.

When I'm not coding, you can find me:
• Exploring new digital art techniques
• Contributing to open-source projects
• Learning about emerging technologies
• Creating interactive installations
• Documenting my learnings in my knowledge base

<span class="response info">💡 Check out my notes and documentation with the 'notes' command!</span>

<span class="response info">"Code is poetry in motion" - Artist Universe Motto</span>
        `;
        this.addToOutput(aboutText);
    }

    skills() {
        const skillsText = `
<span class="response success">Technical Skills</span>

<span class="response info">Programming Languages:</span>
• JavaScript (ES6+) ████████████ 95%
• Python           ██████████   85%
• HTML/CSS         ████████████ 95%
• React            █████████    80%
• Node.js          ████████     75%

<span class="response info">Creative Tools:</span>
• Adobe Creative Suite
• Blender 3D
• Processing/p5.js
• Three.js
• WebGL

<span class="response info">Other:</span>
• Git/GitHub
• Docker
• AWS
• Database Design
• UI/UX Design
        `;
        this.addToOutput(skillsText);
    }

    projects() {
        const projectsText = `
<span class="response success">Featured Projects</span>

<span class="response info">1. Interactive Art Gallery</span>
   A web-based virtual gallery with 3D navigation
   Tech: Three.js, WebGL, React
   Status: Live

<span class="response info">2. AI Art Generator</span>
   Machine learning powered artwork creation
   Tech: Python, TensorFlow, Flask
   Status: Development

<span class="response info">3. Music Visualizer</span>
   Real-time audio visualization in the browser
   Tech: Web Audio API, Canvas, JavaScript
   Status: Live

<span class="response info">4. Digital Poetry Platform</span>
   Interactive platform for digital poetry
   Tech: Vue.js, Node.js, MongoDB
   Status: Beta

Type 'contact' to collaborate on projects!
        `;
        this.addToOutput(projectsText);
    }

    contact() {
        const contactText = `
<span class="response success">Contact Information</span>

Email: artist@universe.tech
GitHub: github.com/artistuniverse
Portfolio: artistuniverse.tech
LinkedIn: linkedin.com/in/athinat

<span class="response info">Open to:</span>
• Creative collaborations
• Freelance projects
• Open source contributions
• Art commissions
• Speaking engagements

Let's create something amazing together! 🚀
        `;
        this.addToOutput(contactText);
    }

    social() {
        const socialText = `
<span class="response success">Social Media & Links</span>

🐙 GitHub: github.com/artistuniverse
💼 LinkedIn: linkedin.com/in/artistuniverse
🐦 Twitter: @artistuniverse
📸 Instagram: @artistuniverse.tech
🎨 Behance: behance.net/artistuniverse
💻 CodePen: codepen.io/artistuniverse

<span class="response info">Follow for updates on latest projects and digital art!</span>
        `;
        this.addToOutput(socialText);
    }

    notes() {
        this.addToOutput('📚 Knowledge Base & Documentation', 'response success');
        this.addToOutput('');
        this.addToOutput('Welcome to my digital brain! Here you\'ll find my notes, learnings,');
        this.addToOutput('and documentation from my journey as a creative developer.');
        this.addToOutput('');
        this.addToOutput('🧠 What\'s Inside:', 'response info');
        this.addToOutput('• Technical tutorials and guides');
        this.addToOutput('• Creative coding experiments');
        this.addToOutput('• Learning notes from courses and books');
        this.addToOutput('• Project documentation');
        this.addToOutput('• Tools and resources I recommend');
        this.addToOutput('• Thoughts on art, code, and creativity');
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
    ╔════════════════════╗
    ║   PIXEL  DREAMS    ║
    ╚════════════════════╝
    ░░░░░░░▒▒▒▒▒▒▓▓▓▓▓▓██
    ░░░▒▒▒▒▓▓▓███████████
    ░▒▒▓▓███████████████▓
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
    ╭──────────────────╮
    │   CREATIVE.EXE   │
    ├──────────────────┤
    │ Loading...       │
    │ ████████░░  80%  │
    │ Inspiration.dll  │
    │ loaded ✓         │
    ╰──────────────────╯
        `,
            `
         /\\_/\\  
        (  o.o  ) 
         > ^ <    
    ┌─────────────────┐
    │ CURIOUS  CODER  │
    │ always learning │
    └─────────────────┘
        `,
            `
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █  ♪ SOUND WAVES ♪ █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    ♫ ═══════════════ ♫
    ♪ ░░░░░▒▒▒▒▓▓▓████ ♪
    ♫ ████▓▓▓▒▒▒░░░░░ ♫
    ♪ ═══════════════ ♪
        `,
            `
    ┌─[ NEURAL NETWORK ]─┐
    │ ○───○───○───○─────│
    │ │ \\ │ / │ \\ │     │
    │ ○───●───○───○─────│
    │ │ / │ \\ │ / │     │
    │ ○───○───●───○─────│
    └───────────────────┘
         THINKING...
        `,
            `
    ╔══════════════════╗
    ║ MATRIX TERMINAL  ║
    ╠══════════════════╣
    ║ 01001000 01100101║
    ║ 01101100 01101100║
    ║ 01101111 00100000║
    ║ 01110111 01101111║
    ║ 01110010 01101100║
    ║ 01100100 00100001║
    ╚══════════════════╝
        `,
            `
    🎨 ARTIST'S PALETTE 🎨
    ┌─────────────────────┐
    │ ●●●   ●●●   ●●●     │
    │  ●     ●     ●      │
    │   ●●●   ●●●   ●●●   │
    │     RGB  HSL  HEX   │
    └─────────────────────┘
        COLORS = EMOTIONS
        `,
            `
    ╭─ TERMINAL LOVE ─╮
    │ > sudo love     │
    │ [sudo] password │
    │ for universe:   │
    │ ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️  │
    │ Love installed! │
    ╰─────────────────╯
        `,
            `
    ▲ MOUNTAIN OF CODE ▲
           /\\
          /  \\
         /____\\
        /      \\
       /   {}   \\
      /    {}    \\
     /______________\\
    [ CLIMB HIGHER! ]
        `,
            `
    ╔═══ SPACE INVADER ═══╗
    ║      ▄▄██▄▄        ║
    ║    ████████████    ║
    ║  ██████████████    ║
    ║  ██▄██████▄██      ║
    ║  ████▄▄▄▄████      ║
    ║    ██    ██        ║
    ║   ████  ████       ║
    ╚═══════════════════╝
        `,
            `
    🚀 LAUNCH SEQUENCE 🚀
    ┌─────────────────────┐
    │ [▓▓▓▓▓▓▓▓▓▓] 100%   │
    │                     │
    │ All systems GO!     │
    │ Creativity: ONLINE  │
    │ Inspiration: READY  │
    │                     │
    │ 🚀 LAUNCHING... 🚀  │
    └─────────────────────┘
        `,
            `
    ╭──── BINARY TREE ────╮
    │        1            │
    │      /   \\          │
    │     0     1         │
    │   /  \\  /  \\       │
    │  1    0 1    0      │
    │ /|   /| |\\   |\\    │
    │0 1  1 0 0 1  1 0    │
    ╰─────────────────────╯
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
        `
        ];
        
        const randomArt = artPieces[Math.floor(Math.random() * artPieces.length)];
        this.addToOutput(`<pre class="ascii-art">${randomArt}</pre>`);
    }

    universe() {
        this.addToOutput(`
<span class="response success">🌌 Welcome to the Artist Universe 🌌</span>

In this digital realm, creativity knows no bounds...

<pre class="ascii-art">
    ⭐ ─── ✦ ─── ⭐ ─── ✧ ─── ⭐
        │               │
        │   EXPLORE     │
        │   CREATE      │
        │   INSPIRE     │
        │               │
    ⭐ ─── ✧ ─── ⭐ ─── ✦ ─── ⭐
</pre>

<span class="response info">This universe contains:</span>
• Infinite creative possibilities
• Collaborative spaces
• Digital art galleries
• Interactive experiences
• Community connections

Type any command to continue exploring! 🚀
        `);
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
        this.addToOutput('                        ARTIST UNIVERSE                        ', 'response success');
        this.addToOutput('                   Creative Developer & Digital Artist        ', 'response success');
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
        this.addToOutput('');
        
        // Contact Info
        this.addToOutput('📧 artist@universe.tech              🌐 artistuniverse.tech');
        this.addToOutput('🐙 github.com/artistuniverse         📍 The Internet');
        this.addToOutput('💼 linkedin.com/in/artistuniverse    📱 @artistuniverse');
        this.addToOutput('');
        
        // Professional Summary
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('PROFESSIONAL SUMMARY', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('A sophisticated mofo who likes all things different. Passionate creative');
        this.addToOutput('developer with 5+ years of experience bridging the gap between technology');
        this.addToOutput('and art. Specialized in creating immersive digital experiences that inspire');
        this.addToOutput('and engage users through innovative web technologies.');
        this.addToOutput('');
        
        // Technical Skills
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('TECHNICAL SKILLS', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Languages:', 'response success');
        this.addToOutput('• JavaScript (ES6+)     • Python              • HTML5/CSS3');
        this.addToOutput('• TypeScript            • PHP                 • SQL');
        this.addToOutput('');
        this.addToOutput('Frameworks & Libraries:', 'response success');
        this.addToOutput('• React/Next.js         • Vue.js              • Node.js');
        this.addToOutput('• Three.js/WebGL        • p5.js/Processing    • Express');
        this.addToOutput('');
        this.addToOutput('Creative Tools:', 'response success');
        this.addToOutput('• Adobe Creative Suite  • Blender 3D          • Figma');
        this.addToOutput('• After Effects         • Cinema 4D           • Sketch');
        this.addToOutput('');
        this.addToOutput('Development Tools:', 'response success');
        this.addToOutput('• Git/GitHub            • Docker              • AWS');
        this.addToOutput('• VS Code               • Webpack             • Vite');
        this.addToOutput('');
        
        // Experience
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('EXPERIENCE', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Senior Creative Developer | Digital Art Collective | 2022-Present', 'response success');
        this.addToOutput('• Lead development of interactive web installations');
        this.addToOutput('• Created real-time audio visualizers using Web Audio API');
        this.addToOutput('• Collaborated with artists on 15+ digital art projects');
        this.addToOutput('• Increased user engagement by 300% through interactive features');
        this.addToOutput('');
        this.addToOutput('Frontend Developer | Creative Agency | 2020-2022', 'response success');
        this.addToOutput('• Developed responsive websites for creative professionals');
        this.addToOutput('• Implemented 3D web experiences using Three.js');
        this.addToOutput('• Optimized performance resulting in 40% faster load times');
        this.addToOutput('• Mentored junior developers in creative coding techniques');
        this.addToOutput('');
        this.addToOutput('Freelance Digital Artist | Self-Employed | 2019-Present', 'response success');
        this.addToOutput('• Created custom interactive installations for events');
        this.addToOutput('• Developed AI-powered art generation tools');
        this.addToOutput('• Built digital poetry platform with 1000+ active users');
        this.addToOutput('• Published creative coding tutorials with 50k+ views');
        this.addToOutput('');
        
        // Featured Projects
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
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
        this.addToOutput('');
        
        // Education
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('EDUCATION & CERTIFICATIONS', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('Bachelor of Fine Arts | Digital Media & Technology | 2019', 'response success');
        this.addToOutput('University of Creative Arts');
        this.addToOutput('');
        this.addToOutput('Certifications:', 'response success');
        this.addToOutput('• AWS Certified Developer Associate');
        this.addToOutput('• Google Cloud Professional Cloud Architect');
        this.addToOutput('• Adobe Certified Expert (Photoshop, After Effects)');
        this.addToOutput('');
        
        // Achievements
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('ACHIEVEMENTS & RECOGNITION', 'response info');
        this.addToOutput('────────────────────────────────────────────────────────────', 'response info');
        this.addToOutput('');
        this.addToOutput('• Featured in "Top 30 Under 30" Creative Technologists (2023)');
        this.addToOutput('• Winner - Digital Art Innovation Award (2022)');
        this.addToOutput('• Speaker at CreativeTech Conference (2021, 2022, 2023)');
        this.addToOutput('• 20+ articles published on creative coding and digital art');
        this.addToOutput('• Open source contributions: 500+ GitHub stars across projects');
        this.addToOutput('');
        
        // Footer
        this.addToOutput('════════════════════════════════════════════════════════════', 'response success');
        this.addToOutput('💡 "Code is poetry in motion" - Artist Universe Motto', 'response info');
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
            'matrix': () => document.body.style.setProperty('--primary-color', '#00ff00'),
            'cyberpunk': () => document.body.style.setProperty('--primary-color', '#ff00ff'),
            'ocean': () => document.body.style.setProperty('--primary-color', '#00ffff'),
            'fire': () => document.body.style.setProperty('--primary-color', '#ff4500'),
            'default': () => document.body.style.setProperty('--primary-color', '#00ff00')
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
