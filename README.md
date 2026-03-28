# 🌌 Vibe | Premium Web Design Agency

> **Vibe** is a high-performance, cinematic web design agency template. Built for brands that demand a bold, professional, and visually stunning digital presence.

![Vibe Header Image](public/og-image.png)

---

## ✨ Features

- **🎬 Cinematic Experience**: Full-screen video background support with high-contrast, dark-mode aesthetics.
- **✨ Micro-Animations**: Advanced animations powered by **GSAP** and **Framer Motion** for a premium feel.
- **🌟 Staggered Testimonials**: Modern social proof component featuring staggered layout and hover-responsive elements.
- **🌀 Infinite Slider**: Sleek logo cloud and project showcase using `infinite-slider` logic.
- **🎨 Tailwind CSS 4 Engine**: Leveraging the latest Tailwind CSS 4 features for hyper-efficient, modern styling.
- **🚀 SEO Optimized**: Pre-configured with Open Graph (OG) tags, Twitter cards, and semantic HTML for professional hosting.
- **⏳ Loading State**: Internal branded loading screen to ensure a seamless experience from first click.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI & Custom shadcn-compatible blocks

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/vibe-agency.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   *Your site will be available at `http://localhost:3000`*

---

## 📂 Project Structure

```text
├── public/                 # Static assets (videos, og-images, robots.txt)
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components (Testimonials, Hero, etc.)
│   │   └── blocks/         # Page sections and complex layouts
│   ├── lib/                # Utility functions (clsx, tailwind-merge)
│   ├── App.tsx             # Main application layout
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles and design tokens
├── index.html              # Main HTML entry with SEO metadata
└── vite.config.ts          # Vite configuration
```

---

## 🌐 Hosting & Deployment

This project is pre-configured for modern hosting platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

### Pre-Deployment Checklist:
- [ ] Update `og:url` and `twitter:url` in `index.html` to your final domain.
- [ ] Ensure `public/og-image.png` represents your brand.
- [ ] Run `npm run build` to generate the production bundle.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
