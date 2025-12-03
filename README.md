# Front-End Development

A high-performance Next.js app using React, TypeScript, Tailwind CSS, shadcn/ui, and Bun for fast builds and a scalable UI.

---

## 🚀 Quick Start

### Pre-Requisite

- **[Bun](https://bun.sh/)** – Fast JavaScript runtime & package manager

### Install Dependencies

```bash
bun install
```

### Development

```bash
bun dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
bun run build
bun start
```

---

## 🛠️ Tech Stack & Tooling

This project is built with a modern React/TypeScript stack, utility-first styling, advanced state/data tools, and automated quality tooling.

### Core

- [Next.js](https://nextjs.org/) – Full-featured React framework (App Router)
- [React](https://react.dev/) – Component-based UI & React Compiler support
- [TypeScript](https://www.typescriptlang.org/) – Type safety and IDE support
- [Bun](https://bun.sh/) – Extremely fast backend, package management, and scripts

### Styling & UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-based styling
- [shadcn/ui](https://ui.shadcn.com/) – Headless, accessible React components
- [Lucide React](https://lucide.dev/) – Open-source SVG icon set

### State, Data, and Forms

- [TanStack Query](https://tanstack.com/query/latest/) – Server/data-fetching helpers
- [Zustand](https://zustand-demo.pmnd.rs/) – Minimal, scalable state management
- [React Hook Form](https://react-hook-form.com/) – Fast, ergonomic form handling
- [Zod](https://zod.dev/) – Typesafe validation & parsing

### Development Utilities

- [Biome](https://biomejs.dev/) – Fast formatter & linter
- [Lefthook](https://github.com/evilmartians/lefthook) – Efficient automated git hooks
- [Commitlint](https://commitlint.js.org/) – Enforce Conventional Commits
- [React Compiler](https://react.dev/learn/react-compiler) – Next-gen UI optimization

---

## 🗂️ Project Structure

Below is an overview of the folder and file structure, with brief descriptions:

```
frontend.dev/
├── public/                   # Static files served at site root
│   ├── robots.txt            # SEO instructions for web crawlers
│   └── static/               # Images and static assets
│       ├── frontend-dev-icon.png
│       ├── frontend-dev-icon.svg
│       └── frontend-dev-thumbnail.png
├── src/                      # Application source code
│   ├── app/                  # Next.js routing, layouts, main entry
│   │   ├── favicon.ico
│   │   ├── globals.css       # Global styles (Tailwind, custom)
│   │   ├── layout.tsx        # App-wide layout component
│   │   └── page.tsx          # Homepage route
│   ├── components/           # Reusable React UI components
│   │   ├── layout/           # App layout pieces (header, footer, etc.)
│   │   │   ├── footer.tsx    # Footer – site info and links
│   │   │   ├── header.tsx    # Header – top nav and branding
│   │   │   ├── providers.tsx # Context providers (theme, state)
│   │   │   └── scripts.tsx   # Script and tag injection
│   │   └── ui/               # UI primitives (buttons, cards, etc.)
│   │       ├── button.stories.tsx
│   │       ├── button.tsx
│   │       ├── card.stories.tsx
│   │       └── card.tsx
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and helpers
│       ├── env.ts
│       └── utils.ts
├── biome.json                # Biome formatter/linter config
├── bun.lock                  # Bun lockfile
├── commitlint.config.mjs     # Commitlint rules
├── components.json           # shadcn/ui component list
├── lefthook.yml              # Lefthook config
├── next-env.d.ts             # Next.js TypeScript types
├── next.config.ts            # Next.js config
├── package.json              # Project metadata, scripts, deps
├── postcss.config.mjs        # PostCSS config
├── tsconfig.json             # TypeScript config
└── README.md                 # Project readme