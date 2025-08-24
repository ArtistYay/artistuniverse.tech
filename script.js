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
        const helpText = `
<span class="response success">Available Commands:</span>

whoami      - Display user information
about       - Learn about me
skills      - View my technical skills
projects    - See my projects
contact     - Get contact information
social      - View social media links
notes       - Access my knowledge base & notes
docs        - Alias for notes command
knowledge   - Explore my documented learnings
art         - Display ASCII art
universe    - Explore the artist universe
ls          - List directory contents
cat [file]  - Display file contents
echo [text] - Display text
history     - Show command history
date        - Show current date and time
matrix      - Enter the matrix...
theme       - Change terminal theme
clear       - Clear the terminal
help        - Show this help message

<span class="response info">Pro tip: Use arrow keys to navigate command history!</span>
<span class="response info">Try 'ls' to see available files, then 'cat [filename]' to view them!</span>
        `;
        this.addToOutput(helpText);
    }

    whoami() {
        const info = `
<span class="response success">Artist Universe Terminal User</span>
Username: artist
Domain: universe.tech
Status: A sophisticated mofo who likes all things different
Location: The Internet
Shell: /bin/bash (Artist Universe Edition)
        `;
        this.addToOutput(info);
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
LinkedIn: linkedin.com/in/artistuniverse

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
        const notesText = `
<span class="response success">📚 Knowledge Base & Documentation</span>

Welcome to my digital brain! Here you'll find my notes, learnings, 
and documentation from my journey as a creative developer.

<span class="response info">🧠 What's Inside:</span>
• Technical tutorials and guides
• Creative coding experiments
• Learning notes from courses and books
• Project documentation
• Tools and resources I recommend
• Thoughts on art, code, and creativity

<span class="response success">🔗 Access Options:</span>

<span class="response info">1. Direct Link:</span>
   <a href="https://notes.artistuniverse.tech" target="_blank" style="color: #74c0fc; text-decoration: underline;">https://notes.artistuniverse.tech</a>

<span class="response info">2. Quick Redirect:</span>
   Auto-redirect will open the notes in 3 seconds

<span class="response info">3. QR Code:</span>
   ████████████████████████
   ██ ▄▄▄▄▄ █▀▄█▄█ ▄▄▄▄▄ ██
   ██ █   █ █ ▄▀▄█ █   █ ██
   ██ █▄▄▄█ █▄█ ▀█ █▄▄▄█ ██
   ██▄▄▄▄▄▄▄█▄▀ ▀▄█▄▄▄▄▄▄▄██
   ██  ▀▄▀ ▄ █▀  ▄▄▀▄█▀▄▄ ██
   ██▄█▄██▄▄▄▀██▄▄▄█▄▄█▄▄▄██
   ██ ▄▄▄▄▄ █▄▀ █▀▄ ▀▄ ▀▄ ██
   ██ █   █ █▀█▄▄▄█▀██▄██▄██
   ██ █▄▄▄█ █ █ ▀▄██▄▀ █▀▄██
   ██▄▄▄▄▄▄▄█▄███▄▄▄█▄██▄▄▄██
   ████████████████████████

<span class="response info">💡 Pro tip: My notes are built with MkDocs from Obsidian!</span>
<span class="response success">Happy learning! 🚀</span>
        `;
        this.addToOutput(notesText);
        
        // Optional: Auto-redirect after showing info
        setTimeout(() => {
            this.addToOutput(`
<span class="response info">🔄 Opening notes in new tab in 3 seconds...</span>
<span class="response">Type 'clear' to cancel or wait for redirect.</span>
            `);
            setTimeout(() => {
                window.open('https://notes.artistuniverse.tech', '_blank');
                this.addToOutput('<span class="response success">✅ Notes opened in new tab!</span>');
            }, 3000);
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
        this.addToOutput(`
<span class="response success">Directory Contents:</span>
drwxr-xr-x  projects/
drwxr-xr-x  artwork/
drwxr-xr-x  experiments/
drwxr-xr-x  notes/ -> https://notes.artistuniverse.tech
-rw-r--r--  README.md
-rw-r--r--  portfolio.json
-rw-r--r--  creative-brief.txt
-rw-r--r--  inspiration.md
-rw-r--r--  resume.pdf

<span class="response info">💡 Use 'notes' command to access the knowledge base</span>
<span class="response info">📄 Use 'cat resume.pdf' to view my resume</span>
        `);
    }

    cat(args) {
        const file = args[0];
        const files = {
            'readme.md': 'Welcome to Artist Universe - Where creativity meets code!',
            'portfolio.json': '{"name": "Artist Universe", "type": "Creative Developer", "passion": "Digital Art"}',
            'creative-brief.txt': 'Mission: Create digital experiences that inspire and engage users through innovative technology.',
            'inspiration.md': '# Daily Inspiration\n\n"The best way to predict the future is to create it." - Peter Drucker',
            'notes': '🔗 Symbolic link to: https://notes.artistuniverse.tech\n\nThis is my knowledge base built with MkDocs from Obsidian notes.\nUse the "notes" command for full access.',
            'resume.pdf': `
<span class="response success">════════════════════════════════════════════════════════════</span>
<span class="response success">                        ARTIST UNIVERSE                        </span>
<span class="response success">                   Creative Developer & Digital Artist        </span>
<span class="response success">════════════════════════════════════════════════════════════</span>

📧 artist@universe.tech              🌐 artistuniverse.tech
🐙 github.com/artistuniverse         📍 The Internet
💼 linkedin.com/in/artistuniverse    📱 @artistuniverse

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">PROFESSIONAL SUMMARY</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

A sophisticated mofo who likes all things different. Passionate creative 
developer with 5+ years of experience bridging the gap between technology 
and art. Specialized in creating immersive digital experiences that inspire 
and engage users through innovative web technologies.

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">TECHNICAL SKILLS</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

<span class="response success">Languages:</span>
• JavaScript (ES6+)     • Python              • HTML5/CSS3
• TypeScript            • PHP                 • SQL

<span class="response success">Frameworks & Libraries:</span>
• React/Next.js         • Vue.js              • Node.js
• Three.js/WebGL        • p5.js/Processing    • Express

<span class="response success">Creative Tools:</span>
• Adobe Creative Suite  • Blender 3D          • Figma
• After Effects         • Cinema 4D           • Sketch

<span class="response success">Development Tools:</span>
• Git/GitHub            • Docker              • AWS
• VS Code               • Webpack             • Vite

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">EXPERIENCE</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

<span class="response success">Senior Creative Developer</span> | Digital Art Collective | 2022-Present
• Lead development of interactive web installations
• Created real-time audio visualizers using Web Audio API
• Collaborated with artists on 15+ digital art projects
• Increased user engagement by 300% through interactive features

<span class="response success">Frontend Developer</span> | Creative Agency | 2020-2022
• Developed responsive websites for creative professionals
• Implemented 3D web experiences using Three.js
• Optimized performance resulting in 40% faster load times
• Mentored junior developers in creative coding techniques

<span class="response success">Freelance Digital Artist</span> | Self-Employed | 2019-Present
• Created custom interactive installations for events
• Developed AI-powered art generation tools
• Built digital poetry platform with 1000+ active users
• Published creative coding tutorials with 50k+ views

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">FEATURED PROJECTS</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

<span class="response success">🎨 Interactive Art Gallery</span>
Web-based virtual gallery with 3D navigation and immersive experiences
Tech: Three.js, WebGL, React | Status: Live

<span class="response success">🤖 AI Art Generator</span>
Machine learning powered artwork creation platform
Tech: Python, TensorFlow, Flask | Status: Development

<span class="response success">🎵 Music Visualizer</span>
Real-time audio visualization in the browser
Tech: Web Audio API, Canvas, JavaScript | Status: Live

<span class="response success">📝 Digital Poetry Platform</span>
Interactive platform for digital poetry and creative writing
Tech: Vue.js, Node.js, MongoDB | Status: Beta

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">EDUCATION & CERTIFICATIONS</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

<span class="response success">Bachelor of Fine Arts</span> | Digital Media & Technology | 2019
University of Creative Arts

<span class="response success">Certifications:</span>
• AWS Certified Developer Associate
• Google Cloud Professional Cloud Architect
• Adobe Certified Expert (Photoshop, After Effects)

<span class="response info">────────────────────────────────────────────────────────────</span>
<span class="response info">ACHIEVEMENTS & RECOGNITION</span>
<span class="response info">────────────────────────────────────────────────────────────</span>

• Featured in "Top 30 Under 30" Creative Technologists (2023)
• Winner - Digital Art Innovation Award (2022)
• Speaker at CreativeTech Conference (2021, 2022, 2023)
• 20+ articles published on creative coding and digital art
• Open source contributions: 500+ GitHub stars across projects

<span class="response success">════════════════════════════════════════════════════════════</span>
<span class="response info">💡 "Code is poetry in motion" - Artist Universe Motto</span>
<span class="response success">════════════════════════════════════════════════════════════</span>
            `
        };
        
        if (file && files[file.toLowerCase()]) {
            this.addToOutput(`<span class="response success">Contents of ${file}:</span>`);
            this.addToOutput(files[file.toLowerCase()]);
        } else if (file) {
            this.addToOutput(`cat: ${file}: No such file or directory`, 'response error');
        } else {
            this.addToOutput('Usage: cat [filename]', 'response info');
        }
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
        this.addToOutput(`<span class="response success">Current Date & Time:</span>`);
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
