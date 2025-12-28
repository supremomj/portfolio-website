# Portfolio Website

A modern, responsive portfolio website built with HTML, Tailwind CSS (via CDN), and vanilla JavaScript.

## Features

- 🎨 Modern, dark-themed design with purple accent colors
- 📱 Fully responsive layout
- 🚀 Fast loading with CDN-based dependencies
- 🎯 Smooth scrolling navigation
- 📦 Modular section-based architecture
- ♿ Accessible markup and semantic HTML

## Project Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles and animations
├── js/
│   └── main.js         # JavaScript functionality
├── sections/           # Modular section components
│   ├── hero.html       # Hero section
│   ├── about.html      # About section
│   ├── projects.html   # Projects showcase
│   ├── skills.html     # Skills & technologies
│   └── contact.html    # Contact form
├── images/            # Image assets
│   └── profile.jpg     # Profile picture
├── archive/           # Old template files (for reference)
├── package.json       # Project configuration
└── README.md          # This file
```

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (optional, for local development server)

### Installation

1. Clone or download this repository
2. No build step required - the project uses CDN for Tailwind CSS

### Running Locally

#### Option 1: Using Node.js (Recommended)

```bash
# Install dependencies (optional)
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000` (or the port shown in terminal)

#### Option 2: Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 3: Direct File Opening

Simply open `index.html` in your web browser (note: some features may not work due to CORS restrictions when loading sections via fetch).

## Customization

### Colors

The primary color scheme is defined in `index.html` within the Tailwind config:

```javascript
colors: {
    "primary": "#7f13ec",
    "primary-dark": "#5e0eb0",
    "background-light": "#f7f6f8",
    "background-dark": "#191022",
    // ... more colors
}
```

### Content

- Edit section files in the `sections/` directory to update content
- Modify `index.html` to change the overall structure
- Update `css/styles.css` for custom styling
- Add functionality in `js/main.js`

### Sections

Each section is a separate HTML file that gets loaded dynamically:
- `sections/hero.html` - Landing section
- `sections/about.html` - About me section
- `sections/projects.html` - Projects showcase
- `sections/skills.html` - Skills and technologies
- `sections/contact.html` - Contact form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No framework dependencies
- **Material Symbols** - Icon library
- **Google Fonts** - Space Grotesk & Noto Sans

## Development Notes

- The project uses Tailwind CSS via CDN for easy setup
- Sections are loaded dynamically using JavaScript fetch API
- For production, consider:
  - Building Tailwind CSS locally for better performance
  - Minifying JavaScript and CSS
  - Optimizing images
  - Setting up a proper backend for the contact form

## License

MIT License - feel free to use this project for your own portfolio!

## Contributing

Feel free to fork this project and customize it for your needs. If you have improvements, pull requests are welcome!

