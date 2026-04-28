
# Personal Portfolio — Software Engineer / Military

A bold, B&W halftone portfolio inspired by the Nexora reference, with one electric red accent color. The hero features two AI-generated halftone hands that react to your cursor — when the cursor is far from center, the hands are pulled apart; as the cursor approaches center, both hands move toward each other in sync, almost touching at dead center.

## Visual style

- Light off-white background (`#F5F3EE`) with subtle grain/halftone texture overlay
- Pure black typography, bold condensed sans-serif for headings (Anton / Archivo Black), clean sans for body (Inter)
- One accent: **electric red** (`#FF2D2D`) used sparingly — primary CTA hover, link underlines, section index numbers, active nav state
- Black pill buttons with arrow icons (matching reference)
- Generous whitespace, large type, minimal chrome

## Pages & sections (single-page scroll + smooth nav)

1. **Top nav** — Logo (your initials®) · Work · About · Experience · Contact · "Get in Touch" pill button
2. **Hero** — "Bold headline that defines you." + sub-tagline + "Get in Touch" CTA + the interactive hands
3. **Trusted by / tech stack strip** — Logos of technologies you use (React, Node, Python, Docker, AWS, etc.) styled like the reference's brand strip
4. **About** — Short bio, portrait placeholder, two-column layout
5. **Projects** — Grid of project cards (image + title + 1-line summary + tech tags + "View Live" external link with arrow). Hover reveals red accent underline + slight scale.
6. **Experience timeline** — Vertical timeline mixing software engineering roles and military service, with year markers, role, organization, and short description. Military entries get a subtle insignia/badge mark.
7. **Skills** — Categorized chips (Languages · Frameworks · Tools · Platforms)
8. **Contact** — Big statement ("Let's build something."), email, social icons (GitHub, LinkedIn, etc.), copyright footer

## The interactive hero (the centerpiece)

Two halftone hand images positioned at the bottom of the hero:
- **Left hand** anchored to the left edge, reaching right
- **Right hand** anchored to the right edge, reaching left
- A virtual "center point" sits between them where fingertips would meet

Behavior:
- Track mouse position globally over the hero
- Compute distance from cursor to hero center, normalized 0→1 (0 = at center, 1 = at far corner)
- Translate each hand horizontally toward/away from center based on that distance:
  - Cursor far from center → hands pushed apart (max gap)
  - Cursor at center → hands meet, fingertips nearly touching
- Both hands move **symmetrically and simultaneously** (mirror motion)
- Smooth easing via `requestAnimationFrame` + lerp so motion feels organic, not jittery
- Subtle vertical drift and slight rotation tied to cursor Y for extra life
- On touch devices: gentle automatic loop animation (hands slowly drift in and out) since there's no cursor
- Respects `prefers-reduced-motion` (hands stay in a fixed mid-position)

## Content management — central config file

All your personal content lives in **one file**: `src/content/portfolio.ts`

```ts
export const portfolio = {
  name: "Your Name",
  initials: "YN",
  tagline: "Software Engineer · Currently Serving",
  heroHeadline: "Bold Ideas That\nStart With Vision.",
  heroSubtitle: "...",
  bio: "...",
  email: "you@example.com",
  socials: { github: "...", linkedin: "..." },
  skills: { languages: [...], frameworks: [...], tools: [...] },
  projects: [
    { title, summary, tech: [...], image, liveUrl, repoUrl }
  ],
  experience: [
    { year, role, org, type: "engineering" | "military", description }
  ],
};
```

Edit this one file to update the entire site. Everything else reads from it.

## Asset generation

I'll generate the two hero hands using AI image generation:
- Halftone B&W style matching the reference (one human hand, one robotic hand reaching toward each other)
- Transparent backgrounds, high resolution
- Saved to `src/assets/` and imported as ES modules

Project card images start as placeholders you can swap later.

## Technical details

- React + Vite + Tailwind + TypeScript (existing stack)
- Custom hook `useCursorPosition` for global pointer tracking
- Hero hand motion via CSS `transform: translate3d()` driven by `requestAnimationFrame` + linear interpolation for 60fps smoothness
- Design tokens added to `index.css`: `--accent-red`, halftone background utility, grain texture overlay
- New fonts loaded via `<link>` in `index.html` (Anton for display, Inter for body)
- `next-themes` not needed — site is light-only
- Smooth scroll between sections via anchor links
- Fully responsive: hands scale down and shift position on mobile; nav collapses to a hamburger sheet
- `prefers-reduced-motion` honored throughout

## Out of scope (for now)

- Backend / database / auth (purely static)
- Embedded demo iframes (using external links per your choice)
- Blog, CMS, contact form submission (contact section shows email + socials only)

After you approve, I'll generate the hand images and build the full site. You'll then edit `src/content/portfolio.ts` with your real info.
