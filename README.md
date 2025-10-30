# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
src/
├── components/
│   ├── ui/                 # Componentes base de HeroUI
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── ...
│   ├── layout/             # Componentes de layout
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Sidebar.astro
│   │   └── Navigation.astro
│   ├── sections/           # Secciones reutilizables
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Testimonials.astro
│   │   └── CTA.astro
│   └── shared/             # Componentes compartidos
│       ├── Logo.astro
│       ├── Icon.astro
│       └── Badge.astro
├── islands/                # Componentes interactivos (React)
│   ├── ui/                 # Componentes UI interactivos
│   │   ├── SearchBar.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── Modal.tsx
│   │   └── Tabs.tsx
│   ├── forms/              # Formularios interactivos
│   │   ├── ContactForm.tsx
│   │   ├── Newsletter.tsx
│   │   ├── MultiStepForm.tsx
│   │   └── SearchFilter.tsx
│   ├── features/           # Funcionalidades específicas
│   │   ├── ShoppingCart.tsx
│   │   ├── UserProfile.tsx
│   │   ├── ImageGallery.tsx
│   │   └── LiveSearch.tsx
│   └── utils/              # Utilidades para islands
│       ├── hooks/
│       │   ├── useLocalStorage.ts
│       │   ├── useApi.ts
│       │   └── useTheme.ts
│       └── context/
│           ├── CartContext.tsx
│           ├── AuthContext.tsx
│           └── ThemeContext.tsx
├── layouts/                # Layouts de página
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   ├── DashboardLayout.astro
│   └── AdminLayout.astro
├── pages/                  # Rutas de la aplicación
│   ├── index.astro
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro
│   │   ├── [slug].astro
│   │   └── category/
│   │       └── [category].astro
│   ├── products/
│   │   ├── index.astro
│   │   ├── [id].astro
│   │   └── category/
│   │       └── [category].astro
│   └── api/                # Endpoints de API
│       ├── contact.json.ts
│       └── search.json.ts
├── content/                # Contenido con Content Collections
│   ├── blog/
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── config.ts
│   ├── products/
│   │   ├── product-1.md
│   │   ├── product-2.md
│   │   └── config.ts
│   └── config.ts
├── styles/                 # Estilos globales y utilities
│   ├── globals.css
│   ├── variables.css
│   ├── components.css
│   └── utilities.css
├── utils/                  # Utilidades de JavaScript/TypeScript
│   ├── helpers.ts
│   ├── formatters.ts
│   ├── constants.ts
│   └── validations.ts
├── stores/                 # Stores de estado (Zustand, Nano Stores, etc.)
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── cartStore.ts
└── types/                  # Definiciones de TypeScript
    ├── global.d.ts
    ├── content.ts
    ├── api.ts
    └── components.ts
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
