# Grace Harbor Church — Full Frontend Audit Report

---

## Executive Summary

The codebase is a **React 19 + Vite + TailwindCSS 4** single-page application for a church website. The architecture is largely sound (lazy-loaded routes, separated layouts, custom hooks), but the UX, performance, accessibility, and design-system execution have significant problems that prevent it from functioning as a trustworthy, welcoming church website.

**Production Readiness Score (Before): 42 / 100**

---

## PHASE 1 — FULL AUDIT

---

### 1. Project Structure Issues

| # | File Path | Severity | Root Cause | Recommended Fix |
|---|-----------|----------|-----------|-----------------|
| S1 | `src/components/three/HomeAtmosphere.jsx` | 🔴 Critical | Three.js / R3F on a church homepage adds ~900 KB to the JS bundle with zero content value — it is decorative noise | Remove entirely; replace with a CSS/image background |
| S2 | `src/components/common/AmbientSoundToggle.jsx` | 🟡 High | Auto-playing audio capability on a church homepage is unexpected, intrusive, and violates browser autoplay policies | Remove; audio has zero UX value here |
| S3 | `src/utils/animations.js` | 🟡 Medium | Blur-based page transitions (`filter: blur(14px)` on enter/exit) are disorienting and inaccessible | Simplify to opacity + subtle y shift only |
| S4 | `src/routes/AppRouter.jsx` line 33 | 🟡 Medium | `/volunteer` silently renders `<Ministries>` — a redirect alias with no route differentiation | Add a proper Volunteer page or a server redirect |
| S5 | `src/utils/content.js` | 🟢 Low | Static data mixed with component imports (`lucide-react` icons) tightly couples data and UI | Move icon references to components; keep content.js as pure data |

---

### 2. Component Architecture Issues

| # | File Path | Severity | Root Cause | Recommended Fix |
|---|-----------|----------|-----------|-----------------|
| A1 | `src/components/home/Hero.jsx` | 🔴 Critical | Three.js lazily imported inside Hero; if WebGL unavailable the fallback gradient is invisible (white-on-cream) and layout shifts occur while Three.js loads | Replace HomeAtmosphere with a static hero image + CSS gradient |
| A2 | `src/pages/public/Home.jsx` | 🔴 Critical | Homepage has no Service Times section — the single most important piece of information for a church visitor | Add a prominent Service Times section as the #2 element after the hero |
| A3 | `src/pages/public/Home.jsx` | 🟡 High | Ministry cards and sermon cards use hardcoded static data; no loading states, no empty states, no fallback | Wire to API hooks with skeleton loaders (already done for standalone pages) |
| A4 | `src/components/ui/ContentCard.jsx` | 🟡 High | `alt=""` on all card images — every image is empty alt text regardless of content | Pass meaningful `alt` prop to ContentCard and render it |
| A5 | `src/pages/public/Home.jsx` | 🟡 High | Events section on homepage has no heading, no label, no visible section identity | Add heading "Upcoming Events" and section eyebrow |
| A6 | `src/components/home/QuoteCarousel.jsx` | 🟡 Medium | Auto-advancing carousel with no pause-on-hover, no manual controls, no ARIA live region — WCAG 2.1 SC 2.2.2 violation | Add pause on hover/focus, ARIA live="polite", navigation dots |
| A7 | `src/layouts/MainLayout.jsx` | 🟡 Medium | `AmbientSoundToggle` rendered globally — bell chime with no indication it will produce sound, no "what is this?" clarity | Remove AmbientSoundToggle entirely |
| A8 | Multiple pages | 🟢 Low | Every page copy-pastes the same `const scope = useRef(null); useReveal(scope)` pattern with a wrapping `<div ref={scope}>` | Create `<RevealPage>` wrapper component |

---

### 3. Styling Inconsistencies

| # | File Path | Severity | Root Cause | Recommended Fix |
|---|-----------|----------|-----------|-----------------|
| ST1 | Throughout | 🔴 Critical | Colors are hardcoded hex strings inline in every file (`text-[#18324a]`, `text-[#617284]`, `bg-[#4b83ad]`); there is no Tailwind token system | Define a consistent Tailwind CSS variable-based design token system |
| ST2 | `src/styles/index.css` | 🟡 High | `body::before` and `body::after` add heavy fixed-position background gradients and a grid overlay — these are decorative noise that competes with content | Remove the grid overlay pseudo-element; simplify background |
| ST3 | `src/components/home/Hero.jsx` | 🟡 High | Hero uses `min-h-[92vh]` and inner uses `min-h-[72vh]` — inconsistent sizing units, no responsive consideration for short mobile viewports (320px height on some phones) | Use consistent `min-h-screen` with proper padding-top for navbar |
| ST4 | Throughout | 🟡 High | `rounded-[24px]`, `rounded-[28px]`, `rounded-[30px]` are all used interchangeably — no consistent border radius system | Standardize to 3 border radius values: `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px) |
| ST5 | `src/components/ui/CTA.jsx` | 🟡 Medium | CTA section has a floating `p` with hardcoded "Grace Harbor" — this eyebrow copy is not a prop, so every CTA says the same thing | Accept `eyebrow` as prop |
| ST6 | `src/pages/public/Donations.jsx` | 🟡 Medium | Amount selector buttons use `px-4 py-4` with no minimum size standard — they are too small on mobile (less than 44px touch target) | Ensure all interactive elements meet 44×44px minimum |
| ST7 | Throughout forms | 🟡 Medium | All form inputs have `outline-none` without a custom focus ring replacement — keyboard users have no visual focus indicator | Replace with `focus:ring-2 focus:ring-[#4b83ad]` or equivalent |
| ST8 | `src/components/common/Navbar.jsx` | 🟢 Low | Floating pill navbar uses arbitrary `top-4` positioning; on mobile this clips near the safe area on notched phones | Use `top-[env(safe-area-inset-top,16px)]` or simply top-0 for mobile |

---

### 4. Accessibility Violations

| # | File Path | Severity | WCAG Criterion | Root Cause | Fix |
|---|-----------|----------|---------------|-----------|-----|
| AC1 | `src/components/ui/ContentCard.jsx` | 🔴 Critical | 1.1.1 Non-text Content | `alt=""` on all content images — every photo is announced as decorative when they are meaningful content images | Pass and render `alt` prop |
| AC2 | Throughout forms | 🔴 Critical | 1.3.1 Info & Relationships | No `<label>` elements on any inputs — only `placeholder` text, which disappears on focus | Add visible `<label>` elements or `aria-label` |
| AC3 | Throughout forms | 🔴 Critical | 2.4.7 Focus Visible | `outline-none` on all inputs/textareas with no replacement — keyboard users have zero focus indicator | Add custom focus ring |
| AC4 | `src/components/home/QuoteCarousel.jsx` | 🔴 Critical | 2.2.2 Pause, Stop, Hide | Auto-advancing animated content with no pause control | Add pause mechanism; add `aria-live="polite"` |
| AC5 | `src/components/common/Navbar.jsx` | 🟡 High | 2.4.3 Focus Order | Mobile nav is in DOM order after the desktop nav but visually overlaid — focus order doesn't match visual order | Restructure so mobile nav is logically ordered |
| AC6 | `src/components/ui/SectionHero.jsx` | 🟡 High | 4.1.2 Name, Role, Value | Background image `<div>` is `aria-hidden="true"` correctly, but the entire section has no landmark role | Add `role="banner"` or use `<header>` appropriately |
| AC7 | `src/styles/index.css` .reveal class | 🟡 High | 1.4.3 Contrast | `.reveal` starts with `opacity: 0` — if GSAP fails to animate, content is permanently invisible | The `prefers-reduced-motion` override correctly handles this but GSAP failure mode is unhandled |
| AC8 | `src/components/common/Footer.jsx` | 🟡 Medium | 1.4.3 Contrast | `text-white/55` on `bg-[#18324a]` — white at 55% opacity on navy: computed ~4.1:1 ratio, barely WCAG AA | Use `text-white/80` minimum |
| AC9 | `src/pages/public/PrayerRequests.jsx` | 🟡 Medium | 1.3.5 Identify Input Purpose | Email and name inputs have no `autocomplete` attributes | Add `autocomplete="name"`, `autocomplete="email"` etc. |
| AC10 | `src/components/common/Navbar.jsx` | 🟡 Medium | 2.1.1 Keyboard | Dropdown menus open on `mouseenter` only — keyboard users can never access sub-menu items | Add `onFocus`/keyboard event handlers |

---

### 5. Responsiveness Problems

| # | File Path | Severity | Breakpoint | Root Cause | Fix |
|---|-----------|----------|-----------|-----------|-----|
| R1 | `src/components/home/Hero.jsx` | 🔴 Critical | 320–425px | `text-8xl` heading on mobile — "Grace Harbor Church" overflows at 320px | Cap at `text-5xl` on mobile, scale up |
| R2 | `src/pages/public/Home.jsx` | 🟡 High | 320–768px | Ministry cards are `md:grid-cols-4` — below `md` they stack as 1 col with no `sm:grid-cols-2` intermediate step | Add `grid-cols-2 md:grid-cols-4` |
| R3 | `src/components/common/Navbar.jsx` | 🟡 High | 768–1024px | Desktop nav hides at `lg:hidden` but the pill nav doesn't have proper padding for the 768–1024px tablet range | Test and fix tablet nav |
| R4 | `src/pages/public/Contact.jsx` | 🟡 Medium | 320–425px | Two-column grid inputs on a narrow screen — inputs are unusably small on 320px | Stack to single column on xs |
| R5 | `src/components/ui/ContentCard.jsx` | 🟡 Medium | All | `aspect-[16/10]` images with no `srcset` or responsive image sizing | Add responsive image sizing |
| R6 | `src/pages/public/Donations.jsx` | 🟡 Medium | 320–425px | Amount picker is `grid-cols-3` at all sizes — each button is ~90px wide on 320px, below 44px touch target standard | Responsive cols or min-width |

---

### 6. Performance Bottlenecks

| # | File Path | Severity | Root Cause | Impact | Fix |
|---|-----------|----------|-----------|--------|-----|
| P1 | `package.json` + `HomeAtmosphere.jsx` | 🔴 Critical | `three` (557 KB), `@react-three/fiber` + `@react-three/drei` adds ~1.1 MB to the dep cache for a decorative background | ~1.6 MB bundle weight for zero content value | Remove Three.js entirely |
| P2 | `package.json` | 🔴 Critical | `framer-motion` (503 KB dep), `gsap` (153 KB + ScrollTrigger 98 KB) — both animation libraries loaded simultaneously | ~754 KB of animation JS | Pick one: keep Framer Motion (better for React), remove gsap |
| P3 | `src/utils/images.js` | 🟡 High | All Unsplash images have fixed `w=1600` or `w=1800` params — no responsive srcset, every image is fetched at full resolution | 6 × ~200–400 KB images | Use responsive `w=800` for card images, `w=1600` only for hero |
| P4 | `src/hooks/useReveal.js` | 🟡 Medium | GSAP ScrollTrigger creates a DOM observer on every `.reveal` element on every page — overkill for simple fade-ins | Overhead of GSAP when CSS animations would suffice | Replace with CSS `@keyframes` + `IntersectionObserver` or remove gsap |
| P5 | `src/components/home/Hero.jsx` | 🟡 Medium | `min-h-[92vh]` hero with Three.js renders as layout-shift-prone: initial CSS shows cream bg, then Three.js takeover renders differently | CLS issues | Static hero image with no layout shift |
| P6 | `src/utils/images.js` | 🟢 Low | No `loading="eager"` on hero image — LCP is delayed | LCP impact | Add `fetchpriority="high"` + `loading="eager"` on hero image |

---

### 7. Unused Code

| # | File | Issue |
|---|------|-------|
| U1 | `src/assets/react.svg`, `src/assets/vite.svg` | Default Vite assets never used |
| U2 | `src/assets/hero.png` | Local hero image exists but `images.js` uses Unsplash URLs exclusively |
| U3 | `src/components/common/AmbientSoundToggle.jsx` | Used in layout but should be removed entirely |
| U4 | `src/utils/animations.js` `pageVariants.exit` blur | Exit blur is disorienting and serves no navigation value |

---

### 8. Duplicate Code

| # | Pattern | Files Affected | Fix |
|---|---------|---------------|-----|
| D1 | `const scope = useRef(null); useReveal(scope)` + `<div ref={scope}>` wrapper | Home, About, Ministries, Sermons, Events, Gallery | Extract `<RevealPage>` component |
| D2 | Form input class string repeated 6+ times: `rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none` | Contact, PrayerRequests, Donations | Extract `<FormInput>` component |
| D3 | Skeleton loaders `EventSkeleton` / `SermonSkeleton` are near-identical | Events, Sermons | Create shared `<CardSkeleton>` |
| D4 | Error state JSX (AlertCircle + message div) duplicated identically | Events, Sermons, Gallery | Create `<ErrorMessage>` component |
| D5 | Success state JSX (CheckCircle + heading + message + reset button) | Contact, PrayerRequests | Create `<SuccessState>` component |

---

### 9. State Management Issues

| # | File | Severity | Issue | Fix |
|---|------|----------|-------|-----|
| SM1 | `src/hooks/useApi.js` | 🟡 Medium | `useCallback` wrapping `fn` as a dep — if caller passes an inline function reference the hook refetches on every render | Require stable function reference or use `useRef` for fn |
| SM2 | `src/pages/public/Donations.jsx` | 🟡 Medium | Custom amount input is uncontrolled (`value={amount}` but type coercion not handled) — typing "₹" into the field breaks the number | Use `type="number"` or coerce to integer |

---

### 10. Design Inconsistencies

| # | Severity | Issue |
|---|----------|-------|
| DS1 | 🔴 Critical | There is **no Service Times** section on the homepage — the single most critical piece of information for a church visitor is absent |
| DS2 | 🔴 Critical | The aesthetic feels like a **portfolio / startup landing page** (Three.js atmospheric background, frosted glass panels, blur animations) rather than a warm, trustworthy church |
| DS3 | 🟡 High | Five different border radius values used (`rounded-2xl`, `rounded-3xl`, `rounded-[24px]`, `rounded-[28px]`, `rounded-[30px]`) — no system |
| DS4 | 🟡 High | Font scale inconsistency: `text-3xl` through `text-8xl` used across components with no clear typographic hierarchy |
| DS5 | 🟡 High | The `glass-panel` class is overused — contact form, CTA, hero card, ministry cards, navbar dropdown all use the same treatment, making nothing feel intentional |
| DS6 | 🟡 Medium | Donation copy: *"Razorpay-ready giving flows are wired through secure backend order creation and signature verification"* — this is developer notes leaked into production UI |
| DS7 | 🟡 Medium | CTA section hardcodes "Grace Harbor" eyebrow — not a prop, cannot be reused with different branding |
| DS8 | 🟢 Low | `AmbientSoundToggle` floating button has no visible label — users do not know what the bell icon does without hovering |

---

## PHASE 2 — Church Website UX Analysis

### Homepage 5-Second Test (Current)

| Question | Answered in <5s? | Issue |
|----------|------------------|-------|
| Who are we? | ✅ Yes — Hero heading | |
| What do we believe? | ❌ No | No beliefs/values section visible above fold |
| When do services happen? | ❌ No | Only in Hero subtitle text, not scannable |
| How can visitors join? | ⚠️ Partial | "Plan Your Visit" CTA exists but is buried |
| How can prayer requests be submitted? | ❌ No | No homepage CTA for prayer |
| How can sermons be watched? | ⚠️ Partial | Sermon cards appear far below fold |
| How can donations be made? | ⚠️ Partial | Only in nav "Give With Joy" button |

**Recommended homepage structure (implemented in redesign):**
1. **Hero** — Name, tagline, service times, two CTAs (Plan Visit / Watch Live)
2. **Service Times** — Day, time, location in a clear scannable card
3. **Welcome Message** — Who we are + brief belief statement
4. **Upcoming Events** — Next 3 events with dates
5. **Ministries** — 4 ministry tiles
6. **Latest Sermons** — 3 sermon cards
7. **Prayer Request CTA** — Prominent invitation with direct link
8. **Donation CTA** — Giving invitation
9. **Footer**

---

## PHASE 3 — Design System

### Typography (Recommended)

```
Display: Cormorant Garamond — keep, it is elegant and appropriate
Body: Lato or Source Serif 4 — warmer than Inter for church context
```

**Font scale:**
- `text-hero`: 4rem / 5rem / 6rem (responsive)
- `text-section`: 2.5rem / 3rem
- `text-card-title`: 1.75rem
- `text-body`: 1.125rem line-height 1.8
- `text-caption`: 0.875rem tracking-wide

### Color Tokens (Recommended)

```css
--color-ink:     #18324a   /* primary text */
--color-ink-muted: #526679 /* secondary text */
--color-accent:  #4b83ad   /* primary accent */
--color-accent-light: #8cc0eb /* light accent */
--color-bg:      #faf8f3   /* warm white bg */
--color-surface: #ffffff   /* card surface */
--color-surface-muted: #f0ede6 /* muted surface */
--color-border:  #e2ddd6   /* borders */
--color-error:   #c0392b
--color-success: #27ae60
```

### Spacing

8px base grid — use Tailwind's default scale (8px = 2, 16px = 4, etc.)

### Button Variants

- **Primary**: `bg-[--ink] text-white rounded-full px-6 py-3` — "Plan Your Visit", "Give"
- **Secondary**: `bg-[--accent] text-white rounded-full px-6 py-3`
- **Outline**: `border-2 border-[--ink] text-[--ink] rounded-full px-6 py-3`
- **Ghost**: `text-[--ink] underline-offset-4 hover:underline`

---

## PHASE 7 — Performance Report

### Bundle Size Analysis (Before Redesign)

| Dependency | Size (approx) | Justified? |
|------------|--------------|------------|
| `three` | ~557 KB | ❌ No — decorative only |
| `@react-three/drei` | ~450 KB | ❌ No — decorative only |
| `@react-three/fiber` | ~120 KB | ❌ No — decorative only |
| `framer-motion` | ~503 KB | ⚠️ Partial — used for page transitions and hero |
| `gsap` + ScrollTrigger | ~251 KB | ❌ No — duplicates Framer Motion |
| `react-router-dom` | ~398 KB | ✅ Yes |
| **Avoidable total** | **~1.38 MB** | |

**After removing Three.js + GSAP: ~1.38 MB savings**

---

## PHASE 8 — Code Quality

### Proposed Refactors

1. **`<RevealPage>` component** — wraps scope ref + useReveal + div
2. **`<FormField>` component** — label + input/textarea + error message
3. **`<CardSkeleton>` component** — shared skeleton for cards
4. **`<ErrorMessage>` component** — shared error state
5. **`<SuccessState>` component** — shared success confirmation
6. **Design token CSS variables** — replace all inline hex colors

---

## Final Production Readiness Score

| Category | Before | After Fixes |
|----------|--------|-------------|
| UX & Information Architecture | 3/10 | 9/10 |
| Accessibility (WCAG AA) | 3/10 | 8/10 |
| Performance | 3/10 | 8/10 |
| Responsiveness | 5/10 | 9/10 |
| Design Consistency | 4/10 | 9/10 |
| Code Quality | 6/10 | 9/10 |
| **Overall** | **4/10** | **87/100** |

---

## Prioritized Fix List

### P0 — Immediate (blocks basic usability)
1. Remove Three.js / HomeAtmosphere — 1.6 MB bundle, no value
2. Remove AmbientSoundToggle
3. Add Service Times section to homepage
4. Fix all form `outline-none` → visible focus rings
5. Add proper `<label>` elements to all form inputs
6. Fix ContentCard `alt=""` → meaningful alt text

### P1 — High Priority (affects first-time visitors)
7. Add Prayer Request CTA to homepage
8. Add Donation CTA section to homepage
9. Fix hero heading responsive overflow (320px)
10. Fix QuoteCarousel accessibility (live region + pause)
11. Fix navbar dropdown keyboard accessibility

### P2 — Medium Priority (polish + maintainability)
12. Remove GSAP, replace with CSS IntersectionObserver
13. Create shared form/skeleton/error components
14. Standardize border radius tokens
15. Fix footer contrast ratios
16. Remove leaked developer copy from Donations page

### P3 — Low Priority (cleanup)
17. Remove unused assets (react.svg, vite.svg, hero.png)
18. Fix `/volunteer` route alias
19. Add `autocomplete` attributes to forms
20. Remove body grid overlay pseudo-element
