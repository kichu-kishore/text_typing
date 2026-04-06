# Typing Test Application

## Overview

This is a comprehensive typing test web application built with React, TypeScript, and Express. The application provides users with various typing test modes, interactive games, structured practice lessons, and the ability to earn certificates. It features real-time WPM (Words Per Minute) tracking, accuracy metrics, and multiple difficulty levels with themed content.

The application follows a modern, minimal design approach inspired by shadcn/ui principles, focusing on clarity and distraction-free typing experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query for server state management and data fetching

**UI Component System:**
- shadcn/ui component library (Radix UI primitives with custom styling)
- Tailwind CSS for styling with custom design tokens
- "New York" style variant from shadcn/ui
- Component-based architecture with reusable UI primitives located in `client/src/components/ui/`

**State Management:**
- Local component state using React hooks (useState, useEffect, useRef)
- Theme state managed via Context API (`ThemeProvider`)
- Form state and validation using React Hook Form with Zod schemas
- No global state management library; state is kept close to where it's used

**Key Design Patterns:**
- Component composition with variants (using class-variance-authority)
- Custom hooks for reusable logic (e.g., `use-mobile`, `use-toast`)
- Controlled components for form inputs and typing interface
- Render props and context for cross-cutting concerns (theme, toast notifications)

**Typography System:**
- Primary font: Inter (via Google Fonts)
- Monospace font: JetBrains Mono (for code typing tests)
- Additional fonts: DM Sans, Fira Code, Geist Mono, Architects Daughter
- Semantic font sizing with Tailwind utilities

**Layout Approach:**
- Responsive design with mobile-first breakpoints
- Max-width containers (typically `max-w-4xl` for content, `max-w-6xl` for wider sections)
- Consistent spacing scale using Tailwind units (2, 4, 6, 8, 12, 16, 20)
- Card-based UI for distinct sections

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Node.js HTTP server
- Modular route registration system (`registerRoutes` function)

**Development vs Production:**
- Separate entry points: `server/index-dev.ts` and `server/index-prod.ts`
- Development mode integrates Vite middleware for HMR (Hot Module Replacement)
- Production mode serves pre-built static assets from `dist/public`
- Custom logging middleware for request/response tracking

**Data Storage:**
- In-memory storage implementation (`MemStorage` class in `server/storage.ts`)
- Storage interface (`IStorage`) defines CRUD operations
- Easily swappable for database implementation (currently user management only)
- Uses TypeScript interfaces for type-safe data operations

**API Design:**
- RESTful API structure with `/api` prefix convention
- JSON request/response format
- Request body parsing with Express middleware
- Raw body buffering for webhook/signature verification scenarios

**Database Schema (Prepared for PostgreSQL):**
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts` using Drizzle's table definitions
- User table with UUID primary keys and unique username constraint
- Zod schemas derived from Drizzle schemas for validation
- Migration support via `drizzle-kit` (migrations output to `./migrations`)

### External Dependencies

**Database & ORM:**
- `@neondatabase/serverless` - PostgreSQL driver for serverless environments (Neon database)
- `drizzle-orm` - TypeScript ORM for type-safe database queries
- `drizzle-zod` - Integration for generating Zod schemas from Drizzle tables
- `connect-pg-simple` - PostgreSQL session store (prepared for session management)

**UI Component Libraries:**
- `@radix-ui/*` - 20+ unstyled, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- `cmdk` - Command palette component
- `embla-carousel-react` - Carousel/slider component
- `vaul` - Drawer component (imported as DrawerPrimitive)
- `react-day-picker` - Date picker component
- `input-otp` - OTP input component
- `recharts` - Charting library for data visualization

**Styling & Utilities:**
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - CSS vendor prefixing
- `class-variance-authority` - Type-safe variant handling for components
- `clsx` & `tailwind-merge` - Conditional class composition and conflict resolution
- `lucide-react` - Icon library
- `react-icons` - Additional icon sets (SiX, SiFacebook, etc. for social sharing)

**Form Handling:**
- `react-hook-form` - Performant form state management
- `@hookform/resolvers` - Validation resolvers for react-hook-form
- `zod` - TypeScript-first schema validation

**Data Fetching:**
- `@tanstack/react-query` - Asynchronous state management and data synchronization
- Custom fetch wrapper in `lib/queryClient.ts` with error handling

**Development Tools:**
- `@replit/vite-plugin-*` - Replit-specific development plugins (error overlay, cartographer, dev banner)
- `tsx` - TypeScript execution for development server
- `esbuild` - Fast JavaScript bundler for production builds
- `vite` - Build tool and dev server

**Utilities:**
- `date-fns` - Date manipulation and formatting
- `nanoid` - Unique ID generation
- `@jridgewell/trace-mapping` - Source map utilities

**Content Storage:**
- Static JSON file (`client/src/data/content.json`) containing:
  - Typing test texts for different difficulty levels
  - Themed content (pop culture, sports, nature, technology, etc.)
  - Story texts (Aesop's Fables, Baseball Rules, Space Cowboys, etc.)
  - Professional domain texts (legal, medical, business, coding)
  - Practice lesson content and game data

**Third-Party Integrations:**
- Google Fonts API for web fonts (Inter, JetBrains Mono, etc.)
- Social sharing URLs (Twitter/X, Facebook, LinkedIn, WhatsApp) - client-side only, no API keys required

**SEO & Metadata:**
- Comprehensive meta tags for search engines
- Open Graph tags for social media sharing
- Twitter Card metadata
- Canonical URL configuration

**Configuration Files:**
- `components.json` - shadcn/ui configuration (style, paths, aliases)
- `tailwind.config.ts` - Tailwind customization (colors, spacing, fonts)
- `tsconfig.json` - TypeScript compiler options with path aliases
- `vite.config.ts` - Vite build configuration with React plugin
- `drizzle.config.ts` - Database migration configuration
- `postcss.config.js` - PostCSS plugins (Tailwind, Autoprefixer)