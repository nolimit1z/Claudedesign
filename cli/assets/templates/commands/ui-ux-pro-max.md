---
description: UI/UX Pro Max Design Intelligence - Generate complete design systems with AI-powered reasoning
---

## UI/UX Pro Max Design Intelligence

You can search for design patterns, styles, colors, typography, and generate complete design systems.

### Quick Start

To generate a complete design system, just describe your project:

{{args}}

### Design System Generation (Recommended)

Generate a complete design system with reasoning:

```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "{{args}}" --design-system -p "Project Name"
```

This command:
1. Searches 5 domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

### Example Usage

**Generate design system for a SaaS product:**
```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard fintech" --design-system -p "MyApp"
```

**Search specific domains:**
```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart
```

**Stack-specific guidelines:**
```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "state management" --stack react
```

### Available Domains

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional |
| `color` | Color palettes by product type | saas, ecommerce, fintech, beauty |
| `landing` | Page structure, CTA strategies | hero, testimonial, pricing |
| `chart` | Chart types, library recommendations | trend, comparison, timeline |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index |

### Available Stacks

html-tailwind, react, nextjs, vue, svelte, swiftui, react-native, flutter, shadcn, jetpack-compose

### Persist Design System

Save your design system to files for reuse across sessions:

```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "{{args}}" --design-system --persist -p "Project Name"
```

This creates `design-system/{project-slug}/MASTER.md` as the global source of truth.

**With page-specific override:**
```bash
!python3 .iflow/skills/ui-ux-pro-max/scripts/search.py "{{args}}" --design-system --persist -p "Project Name" --page "dashboard"
```

This also creates `design-system/{project-slug}/pages/dashboard.md` for page-specific rules.