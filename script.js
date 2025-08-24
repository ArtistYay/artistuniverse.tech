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
            'resume': this.resume.bind(this),
            'art': this.art.bind(this),
            'universe': this.universe.bind(this),
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
  resume      - Download my resume
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
        `;
        this.addToOutput(helpText);
    }

    whoami() {
        const info = `
<span class="response success">Artist Universe Terminal User</span>
Username: artist
Domain: universe.tech
Status: Creative Developer & Digital Artist
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

    resume() {
        this.addToOutput(`
<span class="response success">Resume Download</span>
📄 Downloading resume... (This would typically download a PDF)

<span class="response info">Resume highlights:</span>
• 5+ years in creative development
• 20+ completed projects
• Expert in web technologies
• Published digital artist
        `);
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
-rw-r--r--  README.md
-rw-r--r--  portfolio.json
-rw-r--r--  creative-brief.txt
-rw-r--r--  inspiration.md
        `);
    }

    cat(args) {
        const file = args[0];
        const files = {
            'readme.md': 'Welcome to Artist Universe - Where creativity meets code!',
            'portfolio.json': '{"name": "Artist Universe", "type": "Creative Developer", "passion": "Digital Art"}',
            'creative-brief.txt': 'Mission: Create digital experiences that inspire and engage users through innovative technology.',
            'inspiration.md': '# Daily Inspiration\n\n"The best way to predict the future is to create it." - Peter Drucker'
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
            this.addToOutput(`Available themes: ${Object.keys(themes).join(', ')}`, 'response info');
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
