# App knowledge — aa9e01c7-4b26-4ae5-8bb0-f31ff540e05c

_Auto-generated after each build from the app's persisted files. Do not hand-edit — it is regenerated automatically. Treat it as the authoritative orientation map; read individual files only when you need their contents._

## Pages (0)
- (none yet)

## API routes (0)
- (none yet)

## Components (0)
- (none yet)

## Lib / helpers (0)
- (none yet)

## Other files (32)
- .npmrc
- DESIGN.md
- package-lock.json
- package.json
- public/_redirects
- src/App.tsx
- src/components/AuthSessionProvider.tsx
- src/components/Navbar.tsx
- src/components/ProtectedRoute.tsx
- src/components/ui/badge.tsx
- src/components/ui/button.tsx
- src/components/ui/card.tsx
- src/components/ui/input.tsx
- src/components/ui/label.tsx
- src/index.css
- src/lib/api-client/auth.ts
- src/lib/api-client/core.ts
- src/lib/api-client/index.ts
- src/lib/preview-bridge.ts
- src/lib/theme.tsx
- src/lib/utils.ts
- src/main.tsx
- src/pages/AdminDashboard.tsx
- src/pages/Dashboard.tsx
- src/pages/Home.tsx
- src/pages/Landing.tsx
- src/pages/Login.tsx
- src/pages/PlatformViewer.tsx
- src/pages/Signup.tsx
- src/routes.tsx
- src/vite-env.d.ts
- tailwind.config.ts

## Database entities
- (no database entities)

## npm dependencies
- @radix-ui/react-slot
- class-variance-authority
- clsx
- lucide-react
- react
- react-dom
- react-router-dom
- recharts
- tailwind-merge
- zod

## Images
_No images in `public/images/library/` yet. Search with `image_search`, then `materialize_image` to save once and reuse the returned `url_path` everywhere._

## Platform conventions
- Next.js **Pages Router**. List/dashboard routes use `pages/<segment>/index.tsx` (directory-first); never create both `pages/X.tsx` and `pages/X/index.tsx`.
- API handlers live under `pages/api/**` and use the shared pool from `lib/db.ts` with `$1, $2…` positional placeholders — never string-interpolate values into SQL.
- JSON responses go through the helpers in `lib/json.ts`.
- Design tokens are CSS variables in `styles/globals.css` (managed by the platform) — style with the token classes, do not hardcode palette hexes.
- `package.json` is a locked path — add packages via the add_dependency tool only.
