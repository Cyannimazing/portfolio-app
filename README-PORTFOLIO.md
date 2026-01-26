# Portfolio Website

A modern, professional portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Aceternity UI components.

## Features

- 🎨 **Dark Theme**: Beautiful dark theme design
- ✨ **Aceternity UI Components**: Stunning animated components including:
  - Spotlight effect on hero section
  - Moving border buttons
  - Smooth animations with Framer Motion
- 📱 **Responsive Design**: Works perfectly on all devices
- 🚀 **Modern Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-app
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio-app/
├── app/
│   ├── globals.css          # Global styles with dark theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Hero.tsx             # Hero/Home section
│   ├── Navigation.tsx       # Navigation menu
│   └── ui/
│       ├── spotlight.tsx    # Spotlight background effect
│       └── moving-border.tsx # Animated border button
└── lib/
    └── utils.ts             # Utility functions
```

## Customization

### Add Your CV

1. Place your CV file in the `public` folder as `cv.pdf`
2. The Download CV button will automatically work

### Update Personal Information

Edit `components/Hero.tsx` to update:
- Your name
- Description/bio
- Social media links (GitHub, LinkedIn, etc.)

### Navigation Links

Edit `components/Navigation.tsx` to customize menu items:
```typescript
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
```

## Email Integration

The "Let's Discuss" button opens the user's default email client with:
- **To:** cyrilnarvasa589@gmail.com
- **Subject:** Let's Discuss
- Pre-filled message template

## Next Steps

To complete your portfolio, you can add:

1. **About Section**: Add information about yourself
2. **Projects Section**: Showcase your work
3. **Skills Section**: Display your technical skills
4. **Contact Form**: Alternative to email button
5. **Blog Section** (optional): Share your thoughts

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Aceternity UI
- **Utilities**: clsx, tailwind-merge

## Build for Production

```bash
npm run build
npm start
```

## Deploy

You can deploy this portfolio to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- Any other hosting platform

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## License

MIT License - Feel free to use this for your own portfolio!
