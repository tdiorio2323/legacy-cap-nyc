# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite + React + TypeScript single-page application for Legacy Capital NYC, a business funding company. The project uses shadcn/ui components with Tailwind CSS for styling.

## Development Commands

```bash
# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm preview

# Run site audit (checks for broken links, accessibility, SEO, security issues)
npm run audit
```

## Architecture

### Tech Stack
- **Build Tool**: Vite with SWC for fast React compilation
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6 (BrowserRouter)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives via shadcn/ui
- **Backend**: Supabase (optional - app functions without credentials via mock mode)

### Project Structure
- `src/App.tsx` - Root component with providers (QueryClient, TooltipProvider, BrowserRouter)
- `src/pages/` - Page components (Index, NotFound)
- `src/components/` - Feature components (HeroSection, ServicesSection, etc.)
- `src/components/ui/` - Reusable shadcn/ui components
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - Utility functions (includes `cn` for className merging)
- `src/lib/supabase.ts` - Supabase client and lead management utilities

### Application Flow
The main Index page (`src/pages/Index.tsx`) is a single-page layout composed of:
- Header (with calculator trigger)
- HeroSection
- InstantOfferSimulator
- TransparentPricing
- MCAReadinessScore (includes lead capture)
- UnderwriterNotes (replaces the original ServicesSection)
- ProcessSection
- TestimonialsSection
- ContactSection
- Footer
- FundingCalculator (modal dialog)
- DealDeskLive (floating button with modal)

State is managed locally with useState for simple UI state (e.g., calculator open/close).

### Path Aliases
The project uses `@/*` alias for `./src/*` imports configured in both tsconfig.json and vite.config.ts.

### TypeScript Configuration
TypeScript is configured with relaxed settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`

This allows for more flexible development but be mindful of potential type safety issues.

## Development Notes

- The dev server runs on port 8080 with host "::" (IPv6)
- Component tagging is enabled in development mode via lovable-tagger
- All routes should be added above the catch-all "*" route in App.tsx
- This project was originally created with Lovable and syncs with their platform

### Environment Configuration
Create a `.env` file based on `.env.example` for Supabase integration:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app gracefully handles missing Supabase credentials by:
- Returning `null` for the Supabase client if credentials are missing (src/lib/supabase.ts:9-11)
- Mocking lead submissions with console logs when client is unavailable (src/lib/supabase.ts:30-35)

### Lead Management System
The application captures leads through multiple touchpoints with distinct types:
- `contact` - General contact form submissions
- `pre_approval` - Pre-qualification requests
- `calculator` - Funding calculator interactions
- `deal_desk` - Deal Desk Live chat submissions
- `mca_score` - MCA Readiness Score assessments

All leads flow through `submitLead()` in src/lib/supabase.ts which validates data and stores it in the `leads` table.

### Build Optimization
The production build uses manual code splitting (vite.config.ts:24-29):
- `vendor` chunk: React core libraries
- `ui` chunk: Radix UI components
- `animations` chunk: Framer Motion and Lucide icons

This optimization reduces initial bundle size and improves caching.

## Custom Tools

### Site Audit Tool
Located in `tools/site-audit/audit.js`, this Node.js script performs comprehensive site audits:
- Checks for broken internal/external links
- Identifies empty or placeholder pages
- Validates accessibility (missing alt tags, multiple h1s)
- Checks SEO basics (title, meta description, Open Graph tags)
- Detects performance issues (large assets >512KB)
- Scans for security issues (exposed secrets/keys)
- Identifies UX problems (href="#" anchors)
- Checks code hygiene (console.log, debugger statements)
- Validates brand consistency (inline font-family usage)

Output is written to `reports/` directory in both JSON and Markdown formats with timestamps.
