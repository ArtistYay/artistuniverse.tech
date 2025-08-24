# Artist Universe - Creative Terminal Website

A creative, interactive terminal-style website designed for GitHub Pages. This project showcases a CLI-inspired interface where visitors can explore your portfolio through terminal commands.

## 🚀 Features

- **Interactive Terminal Interface**: Full CLI experience in the browser
- **Multiple Commands**: 20+ interactive commands to explore
- **Responsive Design**: Works on desktop and mobile
- **Animated Background**: Subtle star animations
- **Matrix Effect**: Special visual effects for certain commands
- **Command History**: Navigate previous commands with arrow keys
- **Multiple Themes**: Switch between different color schemes
- **ASCII Art**: Creative visual elements
- **Smooth Animations**: Professional CSS transitions

## 🛠️ Built With

- **HTML5**: Semantic structure
- **CSS3**: Advanced styling with animations and gradients
- **Vanilla JavaScript**: No frameworks needed - pure JS for maximum performance
- **Google Fonts**: JetBrains Mono for authentic terminal feel

## 📁 Project Structure

```
artistuniverse.tech/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # Terminal functionality and commands
└── README.md           # This file
```

## 🎮 Available Commands

Try these commands in the terminal:

### Basic Commands
- `help` - Show all available commands
- `whoami` - Display user information
- `clear` - Clear the terminal screen
- `date` - Show current date and time
- `history` - View command history

### Portfolio Commands
- `about` - Learn about you
- `skills` - View technical skills
- `projects` - See your projects
- `contact` - Get contact information
- `social` - View social media links
- `resume` - Download resume

### Creative Commands
- `art` - Display random ASCII art
- `universe` - Explore the artist universe
- `matrix` - Enter the matrix with visual effects
- `theme [name]` - Change terminal theme

### File System Commands
- `ls` - List directory contents
- `cat [file]` - Display file contents
- `echo [text]` - Display text

## 🎨 Customization

### Personalizing Content

1. **Update Personal Information**: 
   - Edit the command functions in `script.js`
   - Modify `about()`, `skills()`, `projects()`, `contact()` functions

2. **Change Colors/Themes**:
   - Edit CSS variables in `style.css`
   - Modify the `theme()` function in `script.js`

3. **Add New Commands**:
   ```javascript
   // In script.js, add to the commands object:
   'newcommand': this.newCommand.bind(this),
   
   // Then create the function:
   newCommand() {
       this.addToOutput('Your custom response here');
   }
   ```

### Styling Modifications

- **Terminal Colors**: Modify the CSS variables at the top of `style.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Animations**: Adjust keyframes in `style.css`
- **Background**: Modify the gradient in the `body` selector

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Terminal website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/artistuniverse.tech`
   - It may take a few minutes to deploy

### Option 2: Custom Domain (Optional)

1. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS**:
   - Add CNAME record pointing to `yourusername.github.io`

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/artistuniverse.tech.git
   cd artistuniverse.tech
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

## 🎯 Performance Features

- **No Build Process**: Pure HTML/CSS/JS - deploys instantly
- **Lightweight**: Minimal dependencies
- **Fast Loading**: Optimized assets and code
- **Mobile Friendly**: Responsive design
- **SEO Ready**: Proper meta tags and structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Inspiration

This project was inspired by the desire to create an interactive, terminal-style portfolio that stands out from traditional websites. It combines the nostalgia of command-line interfaces with modern web technologies.

---

**Made with ❤️ and lots of ☕ by Artist Universe**

Visit the live site: [artistuniverse.tech](https://artistuniverse.tech)
