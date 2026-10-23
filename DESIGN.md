---
version: alpha
name: Brass Keel
description: A professional networking web app for enterprise and corporate audiences, rendered in a light navy-and-steel trust aesthetic with a restrained brass accent and boardroom-formal, executive energy.
colors:
  page: "#F7F8FA"
  ink: "#16233F"
  ink-muted: "#4A5872"
  surface: "#FFFFFF"
  surface-raised: "#EEF1F5"
  border: "#D8DEE6"
  accent: "#92400E"
  accent-bright: "#B45309"
  accent-wash: "#FDF3E3"
  navy-deep: "#0E1830"
  danger: "#B91C1C"
roles:
  background: page
  surface: surface-raised
  surface-2: surface
  ink: navy-deep
  ink-muted: ink-muted
  accent: accent
  accent-2: accent-bright
  accent-3: ink
  accent-tint: accent-wash
  border: border
  danger: danger
typography:
  display:
    fontFamily: "Libre Franklin"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Libre Franklin"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Libre Franklin"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: "Libre Franklin"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body-lg:
    fontFamily: "Libre Franklin"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Libre Franklin"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Libre Franklin"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
  data:
    fontFamily: "IBM Plex Mono"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    color: "{colors.surface}"
    borderRadius: "{rounded.md}"
    padding: "10px 20px"
    fontWeight: 600
  button-secondary:
    backgroundColor: "{colors.surface}"
    color: "{colors.ink}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.md}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.lg}"
  badge:
    backgroundColor: "{colors.accent-wash}"
    color: "{colors.accent}"
    borderRadius: "{rounded.sm}"
    padding: "2px 8px"
    fontWeight: 600
  input:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.md}"
    padding: "10px 12px"
  avatar:
    borderRadius: "{rounded.full}"
    border: "2px solid {colors.surface}"
  topbar:
    backgroundColor: "{colors.navy-deep}"
    color: "{colors.surface}"
    height: "56px"
  modal:
    backgroundColor: "{colors.surface}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.xl}"
---

## Overview

Brass Keel is the design system for a professional networking web application serving enterprise and corporate audiences — executives, recruiters, deal teams, and senior operators. Its personality is that of a well-run boardroom: composed, precise, and quietly confident. Nothing bounces, nothing glows, nothing begs for attention. The system is light-mode by deliberate choice: its users work in bright offices, on projectors, and in printed-adjacent contexts where dark UI reads as recreational rather than professional. The emotional register is trust earned through restraint — deep navy conveys institutional weight, steel neutrals keep long work sessions calm, and a single brass accent marks the few things that genuinely matter. Every screen should feel like it belongs in a diligence deck: legible at a glance, defensible under scrutiny, and free of anything playful.

## Colors

- `page` (#F7F8FA): the application canvas behind all views. Never used for text or interactive elements.
- `ink` (#16233F): the primary text color and the primary button fill. The anchor of the system — roughly 60% of all colored pixels on any screen trace back to ink or its tints.
- `ink-muted` (#4A5872): secondary text — timestamps, metadata, helper copy, inactive nav items. Never used for headings or primary actions.
- `surface` (#FFFFFF): cards, panels, inputs, modals. The default working plane.
- `surface-raised` (#EEF1F5): recessed zones — table header rows, side rails, hover states on list items, empty-state fills. Never holds body text directly.
- `border` (#D8DEE6): hairlines, dividers, card and input outlines. Structure is drawn with borders, not shadows.
- `accent` (#92400E): the brass accent, reserved for signals of verified status, primary links, active nav indicators, and key metrics. Total accent coverage stays under 5% of any screen. This is the only accent value permitted for text at body sizes.
- `accent-bright` (#B45309): decorative brass only — icon fills, chart highlights, focus ring inner line. Never used for text below 18px/600 weight; on `#FDF3E3` or white it is valid only for large bold text.
- `accent-wash` (#FDF3E3): badge and highlight backgrounds behind `accent` text. Never a full-section background.
- `navy-deep` (#0E1830): the persistent top bar and any dark footer band. Carries white text only.
- `danger` (#B91C1C): destructive actions, error messages, failed verification. Appears nowhere else.

Contrast rule: all body text pairings must meet WCAG AA 4.5:1 — `ink` and `ink-muted` on `page`, `surface`, or `surface-raised` all pass; `accent` text is permitted only on `surface`, `page`, or `accent-wash`; white text is permitted only on `ink` or `navy-deep`.

## Typography

Libre Franklin does all the talking. As a refined American grotesque, it reads institutional without feeling dated — display and heading weights (600, tight tracking) do the shouting, while 400-weight body sizes inform at high density. IBM Plex Mono has exactly one job: precise numerics and identifiers — connection counts, deal sizes, profile IDs, table figures — honoring the finance-adjacent convention that numbers must align and never be ambiguous. The pairing rationale is grotesque-for-voice, mono-for-fact; no third family is permitted.

Casing rules: `label` style is always uppercase with its 0.06em tracking — used for section eyebrows, table headers, badge text, and form field labels. Headings and buttons use sentence case, never title case or all-caps. Body copy is sentence case throughout. Display type never appears below 2rem, and no text anywhere in the product renders below 0.75rem.

## Layout

The app uses a 12-column grid with 24px gutters inside a max content width of 1200px, centered. A persistent 56px `navy-deep` top bar spans the full viewport; below it, a 240px left rail holds primary navigation on `surface-raised`, and the remaining column carries the working canvas. Density is comfortable-compact: list rows at 56px, card padding at 24px, section rhythm at 40px (`spacing.xl`) between major blocks and 64px (`spacing.2xl`) between page-level regions. Two signature moves: (1) the profile/company hero — a full-width white panel with a 2px `accent` top rule, avatar left, identity and actions right, metrics in a `data`-style strip beneath; (2) detail drill-ins open as panels routed in place, never as modals — modals are reserved exclusively for destructive confirmations and short forms.

## Elevation & Depth

There are exactly three elevation levels, and structure is primarily communicated through `border` hairlines, not shadow:

- Level 0 (flat): cards and panels at rest — `none`, border only.
- Level 1 (raised): dropdown menus, popovers, hover-lifted cards — `0 1px 2px rgba(14, 24, 48, 0.08), 0 2px 8px rgba(14, 24, 48, 0.06)`.
- Level 2 (overlay): modals and the command palette, always over a `rgba(14, 24, 48, 0.4)` scrim — `0 4px 12px rgba(14, 24, 48, 0.12), 0 8px 32px rgba(14, 24, 48, 0.12)`.

Hover raises a card from Level 0 to Level 1 over 120ms ease-out with no scale transform. Dragging an item applies Level 1 plus a 1px `accent-bright` outline. Nothing ever exceeds Level 2.

## Shapes

Radius philosophy is architectural: corners are barely eased, never soft. Inputs and buttons use 4px, cards and modals use 8px, badges use 2px — small enough to read as precise, present enough to read as finished. `full` radius is reserved for avatars and status dots only. Icons are drawn in a consistent 1.5px stroke with square caps and no fill, sized 16px or 20px. The one decorative shape language is the brass rule: a 2px `accent-bright` line, maximum 48px wide, used above section eyebrows and atop hero panels. Decoration is forbidden inside data tables, form interiors, and the navigation rail — those zones are pure function.

## Components

- **Primary button**: `ink` fill, white text, 4px radius, 600 weight, sentence case ("Send introduction", not "SEND INTRODUCTION"). Hover darkens to `navy-deep`; active adds a 1px inset `accent-bright` ring; disabled drops to 40% opacity with `not-allowed` cursor.
- **Secondary button**: white fill, `border` outline, `ink` text. Hover swaps border to `ink-muted`; used for all non-primary actions. Danger variant swaps text and border to `danger`.
- **Card**: white, 1px `border`, 8px radius, 24px padding, Level 0 at rest. A card is a unit of one entity — one person, one company, one request — never a mixed-content junk drawer.
- **Badge**: `accent-wash` background, `accent` uppercase label text, 2px radius. Communicates verified status, membership tier, or connection degree. Badges are read-only; interactive counts live in buttons.
- **Input**: white, 1px `border`, 4px radius, 12px horizontal padding, 40px height. Focus shows a 2px `accent-bright` ring with the border held at `ink-muted`; error state swaps the ring to `danger` and places helper text in `danger` below.
- **Avatar**: circular, 2px white ring, sizes 32/48/96px. Always paired with the person's name in `body-md` 600 weight and title or company in `ink-muted` — never a floating anonymous face.
- **Top bar**: `navy-deep`, 56px, white text, product wordmark left in `h3` weight, global search centered, avatar and utility icons right. The only persistently dark element in the product.
- **Modal**: 480px max width, 8px radius, Level 2 over scrim. Title in `h2`, one short paragraph, actions right-aligned with the destructive or primary action last. Copy tone is direct and courteous: state the consequence, name the action, no exclamation points.

## Do's and Don'ts

- Do keep brass accent coverage under 5% of any screen; if a view needs more emphasis, add hierarchy through weight and spacing, not more accent.
- Don't use any radius above 8px except on avatars and status dots.
- Don't render white text on `accent-bright` or `accent-wash` — it fails contrast; white text lives on `ink` and `navy-deep` only.
- Do keep every interactive element's focus state visible: a 2px `accent-bright` ring is mandatory on keyboard focus, never removed.
- Don't set body text smaller than 0.75rem (12px) or below 4.5:1 contrast against its background.
- Do use IBM Plex Mono for all numerics in tables, metrics, and counts; never set figures in the grotesque.
- Don't introduce gradients, glassmorphism, drop-shadow color tints, or animation with overshoot/bounce — all motion is opacity and position over 120–200ms ease-out.
- Don't place decoration inside tables, forms, or the nav rail; the brass rule belongs to page heroes and section eyebrows only.
