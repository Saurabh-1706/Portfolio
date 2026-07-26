# Saurabh Mojad – Minimalist Developer Portfolio

Welcome to my personal developer portfolio. This project is a highly-optimized, single-page application built with modern web technologies, focusing on clean aesthetics, subtle animations, and premium typography.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS v4, Custom CSS Animations (`.fade-up`, `.hero-fade-up`) |
| **Typography** | Google Fonts (Inter, Sora) |
| **Icons** | Material Symbols, devicon |

---

## 📁 Repository Structure

```
portfolio/
├── frontend/             # Next.js Application
│   ├── app/              # Page structure & routing
│   ├── components/       # Reusable UI components (Nav, CountUp, FadeUpObserver, etc.)
│   ├── public/           # Static assets (images, PDF resume, SVGs)
│   └── globals.css       # Global styles and tailwind config
└── README.md             # This documentation
```

---

## 🚀 Getting Started Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features

- **Single Page Architecture**: Smooth scroll navigation between Hero, About, Skills, Work, and Contact sections.
- **Bento Grid Layout**: A modern, visually engaging layout for showcasing technical capabilities.
- **Dynamic Glassmorphism Navbar**: Navbar smoothly transitions to a frosted glass effect on scroll.
- **Scroll Animations**: Custom intersection observer logic smoothly fades elements into view as the user scrolls, with built-in fallbacks for mobile and tall elements. Staggered reveals apply across hero elements, bento cards, project cards, and text.
- **Micro-Interactions**: Hover states scale project thumbnails, translate action buttons, and enlarge social icons.
- **Count-Up Statistics**: Uses `requestAnimationFrame` for a smooth, easing-based number increment animation on statistics.
- **Accessibility First**: Respects `prefers-reduced-motion` settings, completely disabling static transitions and observer delays if the user has requested it.

---

## 📄 License

© 2026 Saurabh Mojad. All rights reserved.
