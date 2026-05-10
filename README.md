# Portfolio

A bold, B&W halftone portfolio website for Software Engineers. Inspired by minimalist design with a unique interactive hero centerpiece.

## 🚀 Features

- **Interactive Hero:** Halftone human and robotic hands that react symmetrically to cursor movement.
- **B&W Aesthetic:** Minimalist off-white background with grain/halftone textures and electric red accents.
- **Experience Timeline:** Integrated view for both software engineering roles and military service.
- **Dynamic Content:** Easily configurable via `src/content/portfolio.ts` or environment variables.
- **Responsive Design:** Optimized for all devices with smooth scrolling and mobile-friendly navigation.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **3D/Interactive:** [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## ⚙️ Configuration

You can update the portfolio content in two ways:

1.  **Directly in code:** Edit `src/content/portfolio.ts`.
2.  **Environment Variables:** Create a `.env` file based on `.env.example` and fill in your details.
3.  **Private Data:** Create `src/content/portfolio.private.ts` for local overrides that won't be committed to Git.

## 📄 License

This project is open-source and available under the MIT License.
