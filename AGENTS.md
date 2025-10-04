# Repository Guidelines

## Project Structure & Module Organization
The app is a Vite + React + TypeScript single-page site. Application code lives in `src/`, with routed views under `src/pages/`, shared layout and feature components under `src/components/`, and reusable primitives in `src/components/ui/` synced from shadcn. Hooks and utilities are grouped in `src/hooks/` and `src/lib/`. Global styling and Tailwind setup are defined in `src/index.css`, `src/App.css`, and `tailwind.config.ts`. Static assets shipped at build time belong in `public/`.

## Build, Test, and Development Commands
Use `npm install` once when onboarding. Run `npm run dev` for the hot-reloading dev server, and `npm run build` to emit the optimized bundle in `dist/`. `npm run build:dev` mirrors the production build with development flags for faster iteration, while `npm run preview` serves the built assets locally for smoke checks. Lint the codebase with `npm run lint` before pushing to catch TypeScript or accessibility regressions.

## Coding Style & Naming Conventions
Stick to TypeScript for all source files (`.tsx` for components, `.ts` for helpers). Follow the existing two-space indentation and arrow-function component pattern. Components are PascalCase, hooks are `useSomething`, and files mirror their exported default. Favor Tailwind utility classes for styling; extract repeated variants with `class-variance-authority` in `src/lib/`. Imports should prefer the `@/` alias for `src` roots. Always run ESLint; it enforces React Hook rules and safe export patterns.

## Testing Guidelines
Automated tests are not yet established. Until a shared testing stack is adopted, rely on manual QA through `npm run dev` and cross-browser spot checks. When introducing tests, colocate them next to the feature (e.g., `Component.test.tsx`) and use Vitest + React Testing Library to stay compatible with Vite. Coordinate coverage expectations in the PR description when adding substantial features.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects (e.g., “Adjust logo size and button style”). Use that tone and keep body text for context or follow-up steps. For pull requests, include a concise summary, link any related Linear/Jira tickets or GitHub issues, list testing steps, and attach UI screenshots or Loom clips for visible changes. Ensure lint/build checks pass before requesting review to keep the main branch releasable.
