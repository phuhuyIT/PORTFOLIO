# 🌌 Code Navigator Portfolio

A high-performance, visually striking portfolio template for Software Engineers. This project blends minimalist B&W halftone aesthetics with advanced 3D interactivity and a cinematic user experience.

![Portfolio Preview](public/placeholder.svg)

## ✨ Key Features

- **Interactive Halftone Hero:** A unique centerpiece featuring human and robotic hands that react symmetrically to cursor movements using custom shaders.
- **Aurora 3D Background:** A GPU-accelerated atmospheric background built with Three.js and React Three Fiber.
- **Sci-Fi Intro Sequence:** A polished boot sequence and "Liquid Glass" filters for a cinematic first impression.
- **Experience Timeline:** A dual-purpose timeline designed to showcase both technical roles and military service or diverse backgrounds.
- **Real-time Performance Monitoring:** Built-in FPS and memory tracking to ensure a smooth experience across all devices.
- **Audio-Reactive Elements:** Subtle sound effects powered by Tone.js and Howler.js (optional/configurable).

## 🛠️ Tech Stack

- **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **3D Engine:** [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei)
- **State & Data:** [TanStack Query](https://tanstack.com/query) + [Zod](https://zod.dev/)
- **Audio:** [Tone.js](https://tonejs.github.io/) + [Howler.js](https://howlerjs.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone https://github.com/phuhuyIT/PORTFOLIO.git

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## ⚙️ Configuration

The portfolio is designed to be highly customizable without deep-diving into the component logic.

1.  **Main Content:** Edit `src/content/portfolio.ts` to update your bio, projects, and experience.
2.  **Environment Variables:** Copy `.env.example` to `.env` for API keys or global settings.
3.  **Private Data:** Use `src/content/portfolio.private.ts` for sensitive or local-only overrides that you don't want to commit to version control.

## 🧪 Testing & Quality

We maintain high standards for code quality and reliability.

- **Unit Testing:** Powered by [Vitest](https://vitest.dev/).
  ```bash
  npm run test        # Run tests once
  npm run test:watch  # Run tests in watch mode
  ```
- **Linting:** Standard ESLint configuration.
  ```bash
  npm run lint
  ```

## ⚡ Performance

Performance is a first-class citizen in this project.

- **Check Performance:** Run the custom lighthouse-based performance script.
  ```bash
  npm run check-perf
  ```
- **Monitoring:** The site includes a `PerfMonitor` component (visible in dev mode) to track render cycles and GPU load.

## 🌐 Deployment

This project is optimized for [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. The `vercel.json` configuration handles all necessary routing and optimizations automatically.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
