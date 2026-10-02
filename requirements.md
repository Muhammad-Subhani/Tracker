# Tracker — Dashboard Design Requirements

## Purpose
This document specifies the dashboard layout and visual design for the "Tracker" app's main screen. It is written for an AI coding agent (Claude Code / CLI) to implement directly. Follow it precisely — this is a design spec, not a suggestion list.

## Design System — Non-Negotiable Constraints

**Do not invent a new color scheme.** Before writing any styles, open the existing calendar component and its stylesheet, extract the exact color tokens (background, card background, border, text, accent) already in use there, and reuse them as-is. Every new component on this dashboard must look like it belongs to the same app as the calendar — same palette, same dark background tone, same accent color — not a new theme.

**Hard rules to prevent generic "AI slop" output:**

- **No default gradient backgrounds.** No purple-to-blue, no pink-to-orange hero gradients anywhere. If a gradient is used at all, it must be a subtle 2-shade variation within the calendar's existing accent color, never a rainbow or saturated gradient.
- **No glassmorphism.** No `backdrop-filter: blur()`, no translucent frosted-glass cards. Cards are solid, flat, with a defined border.
- **No generic drop shadows.** No default `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` Bootstrap-style shadows. If depth is needed, use a 1px border in a slightly lighter shade of the background instead of a shadow.
- **No stock emoji as icons.** Use a proper icon set (lucide-react is available) — never 🔥📈✅ as UI icons.
- **No centered-everything layouts.** Follow the asymmetric grid described below exactly, not a generic centered dashboard template.
- **Typography must have a deliberate scale**, not browser defaults. Define explicit sizes for: greeting/hero text, card titles, stat numbers, body text, micro-labels. Stat numbers and the hero greeting are the two elements allowed to be visually large — everything else stays restrained.
- **Border radius must be consistent** across all cards — pick one radius value (e.g. `16px`) and use it everywhere, not a mix of `8px`/`12px`/`24px` across different components.
- **Spacing must follow a defined scale** (e.g. 4/8/12/16/24/32px), not arbitrary pixel values per component.
- Reuse the exact palette from the Tracker calendar component already built — do not introduce a new accent color family without explicit approval.

## Layout — Grid Structure

The dashboard is a single scrollable page, organized into 5 horizontal bands. Match this structure exactly (see wireframe reference):

```
┌─────────────────────────────┬──────────────────┐
│  Band 1a: Greeting Hero      │  Band 1b: Weather │
├───────────┬───────────┬─────┴──────────────────┤
│  Band 2a  │  Band 2b  │  Band 2c                │
│  Total    │  Total    │  Total Events            │
│  Todos    │  Trackers │                          │
├───────────┴───────────┼──────────────────────────┤
│  Band 3a: Activity     │  Band 3b: Weekly Bar    │
│  Overview (nested)     │  Chart                  │
├────────────────────────┴──────────────────────────┤
│  Band 4a: Upcoming     │  Band 4b: Circular       │
│  Events                │  Stopwatch               │
└────────────────────────┴──────────────────────────┘
```

Use CSS Grid for the outer layout. Bands should NOT be forced to equal heights — Band 3 is taller than Band 2 and Band 4, matching content need, not a rigid template row height.

## Component Specs

### Band 1a — Greeting Hero
- Large, prominent display of the signed-in user's name — this is the dominant visual element of the whole dashboard, not a small header line. Think "hero text," not "navbar label."
- Include a small decorative wavy line/shape in the bottom-right corner of this card (subtle, monochrome, low-opacity — a signature/texture element, not a competing graphic).
- Time-of-day-aware greeting (e.g. "Good evening,") above the name is a nice-to-have if it doesn't clutter the hero.

### Band 1b — Weather Widget
- Replace any placeholder/default weather icon with a clean, custom-styled weather icon (sun/cloud/rain) that matches the app's icon language — not a generic default emoji-style icon.
- Show: current temperature, condition, day of week, date.
- Keep this card visually quieter than the greeting hero — it's secondary information.

### Band 2 — Three Stat Cards (Total Todos / Total Trackers / Total Events)
- Equal width, equal height, sit in one row.
- Each shows: a label (small, muted) and a count (large, high-contrast).
- Do not add icons here unless they're subtle and monochrome — the numbers should do the work.

### Band 3a — Activity Overview Card (composite)
This is a container with three sub-elements:
1. **Nested mini-totals** (top-left inside this card): compact repeat of todo/tracker/event totals — smaller and quieter than Band 2, this is a secondary reference, not a duplicate hero.
2. **Streak graph**: a wavy/smooth line chart showing ongoing activity streak over time. Use `recharts` with a smoothed line (not sharp angular lines). **Use randomly generated placeholder data for now** — this will be wired to real data later; leave a clear `// TODO: replace with real streak data` comment at the data source.
3. **Three small pill/chip elements** along the bottom of this card: "Todos today," "Tracks today," "Events today" — small counts, compact horizontal row, visually lighter weight than the stat cards in Band 2.

### Band 3b — Weekly Contribution Bar Chart
- Bar chart, `recharts`, showing total contributions (todos+trackers+events combined) per day across the current week.
- **Use randomly generated placeholder data for now**, same TODO convention as above.
- Bars should use the same single accent color as the calendar component, not a rainbow per-bar coloring.

### Band 4a — Upcoming Events
- Pull from calendar data: a clean list of upcoming events, nearest first.
- This should feel like the most "designed" card on the page — the person explicitly wants this handled well, not as a bare list. Give each event a date/time label, title, and enough visual breathing room that it doesn't look like a dumped table.
- Handle empty state explicitly (a quiet, non-alarming "Nothing scheduled" message — not a jarring empty box).

### Band 4b — Circular Stopwatch
- A circular progress/stopwatch visual representing the top currently-running tracker (the one with the longest active/clicking time).
- Should visually read as an actual analog stopwatch/progress ring — not a generic percentage donut chart repurposed from a chart library. If built with SVG, hand-craft the ring markings/ticks rather than using a default chart component's circular variant.
- Should update live while a tracker is actively running (clock ticking), and show a static/paused state when nothing is running.

## Data Handling Notes — Read Carefully
- **This is a pure design/layout pass. Do not wire up any API calls, do not call fetch/axios, do not connect to real endpoints anywhere in this task** — including the stat cards, the upcoming events list, and both charts. The person building this will wire up all real data themselves afterward.
- Every single number, list, and chart on this dashboard — stat totals, mini-totals, streak line, weekly bars, upcoming events — should be driven by **hardcoded or randomly generated mock data** defined locally in each component (or a shared `mockData.js`/`mockData.ts` file).
- Mark every mock data source with a `// TODO: replace with real API data` comment so it's trivial to find and swap out later.
- Do not build loading states, error states, or data-fetching hooks for this pass — those only make sense once real data wiring happens.

## File Structure — Keep It Modular

Do not put this graph.jsx in a single file. Follow the same one-concern-per-file convention already used throughout this project (separate files for models, controllers, helpers, hooks, etc.). Concretely:

- One component file per band/card (e.g. `GreetingHero.jsx`, `WeatherWidget.jsx`, `StatCard.jsx`, `ActivityOverviewCard.jsx`, `StreakGraph.jsx`, `WeeklyBarChart.jsx`, `UpcomingEvents.jsx`, `CircularStopwatch.jsx`).
- `StatCard` should be one reusable component parameterized by label/count, not three near-duplicate components for Todos/Trackers/Events.
- A single `graph.jsx` (or similar) that only handles the grid layout and composes the above components — it should not contain markup or logic belonging to any individual card.
- Shared mock data in its own file (e.g. `mockData.js`), not inlined separately and inconsistently in every component.
- Shared style tokens (colors, spacing, radius pulled from the calendar component) should live in one place — a CSS variables file, theme file, or Tailwind config extension — and be imported/reused, not redefined per component.

## Explicit Anti-Slop Checklist (verify before considering this done)
- [ ] No purple/blue gradient anywhere
- [ ] No glass/blur cards
- [ ] No default library box-shadows
- [ ] No emoji-as-icon
- [ ] One consistent border-radius value used everywhere
- [ ] One consistent spacing scale used everywhere
- [ ] Hero greeting is visually dominant, not a small header
- [ ] Weather icon is custom-styled, not default/ugly
- [ ] Stopwatch looks like a stopwatch, not a generic donut chart
- [ ] Upcoming Events list has real visual care, not a bare `<ul>`
- [ ] All placeholder chart data marked with `// TODO`
