# Agentdock website design system

The website presents one connection: an application-owned LangGraph agent,
Agentdock serving and contracts, and an optional editable React interface.
Product claims follow the core and UI READMEs. The published UI installer is
`@agentdock-ai/agentdock-ui`; it adds editable React chat source to an app.

## Visual language

Cool fog canvas, harbor navy ink, and signal colors that encode event types:
teal for tools and live state, violet for message streaming, amber for interrupts
that need a person, green for completion. The hero demo is the main visual: a
chat interface beside the event stream that drives it. Avoid decorative stock
imagery, fabricated metrics, and claims that the preview calls real services.

Tokens live under `.ad-site` in `components/landing.css` so docs theme styles
remain independent.

| Token          | Value     | Purpose                                 |
| -------------- | --------- | --------------------------------------- |
| `--ad-bg`      | `#f3f5f8` | Canvas                                  |
| `--ad-surface` | `#ffffff` | Cards and the interactive preview       |
| `--ad-ink`     | `#0f1b2d` | Text, primary actions, dark panels      |
| `--ad-muted`   | `#566377` | Body and secondary text                 |
| `--ad-line`    | `#dfe4eb` | Dividers and borders                    |
| `--ad-teal`    | `#0d8a87` | Tools, links on hover, focus, live dots |
| `--ad-violet`  | `#6a5bd6` | Message streaming events                |
| `--ad-amber`   | `#d98a14` | Interrupts and approvals                |
| `--ad-green`   | `#1f9566` | Completed states                        |

Bricolage Grotesque sets all text and JetBrains Mono sets code and event names,
both self-hosted through `next/font` in `app/page.tsx`. Headings use tight
negative tracking; reading text uses 1.6 line height at 15 to 17px. A 1200px
container aligns all sections, with 112px section intervals on desktop and 88px
on tablets and phones. Buttons are 40px tall (32px for compact actions) with
14px type, 16px horizontal padding, and an 8px icon gap; phones use 44px touch
targets. Cards use 14 to 16px radii, fine borders, and layered soft shadows.

## Components and behavior

`components/landing.tsx` owns the demo, copy feedback, tabs, navigation, FAQ,
the copyable `/skills.md` implementation prompt, and reusable icon/button
styles. The page entry remains a server component.

- The demo starts when it scrolls into view and replays a scripted run with
  canonical event names. Approve resumes the run; decline completes it without
  the side effect; replay restarts the scenario. It sends no network requests.
- The compatibility row uses text labels. The header and footer use the real logo.
- Copy buttons swap icons, show a tooltip, and announce success or failure.
  Scenario and integration tabs support arrow keys; integration tabs also
  support Home and End.
- FAQ items are buttons with `aria-expanded` controlling labelled regions.
- Mobile navigation closes after selection or Escape, restoring toggle focus on Escape.
- The footer credits Muhammad Zain with a link to `https://muhammad-zain.com` on
  every screen size.
- Visible focus rings, a skip link, labelled sections, and reduced-motion handling
  are required.
- At 1080px the hero and split sections stack; at 860px cards stack, the demo
  panes stack, and navigation becomes a menu. Code scrolls inside its panel.

The homepage uses its own light canvas regardless of the docs' saved theme.

## Icons and motion

Use named Lucide React imports at 16px with 1.75px strokes. Decorative icons are
hidden from assistive technology.

Motion is CSS driven. The hero headline rises word by word, then the copy and
demo follow. Sections reveal once with a short rise and blur clear. Pill
indicators slide under hovered nav links and selected tabs. Cards lift and show
a pointer spotlight; primary buttons drift slightly toward the pointer, sweep a
sheen, and nudge their arrow. Code lines enter in a stagger on tab change, and
collapsible content animates its height.

Under `prefers-reduced-motion: reduce`, animations and transitions collapse to
instant and the demo jumps straight to its final state. HTML stays visible before
JavaScript initializes; only off-screen reveal targets are hidden once motion is on.

Docs use three expanded, collapsible navigation groups with native branch lines,
a short Overview label, and a connected heading tree in the table of contents.
Article titles, routes, search, mobile navigation, and theme selection stay under
Fumadocs. Preserve source node references when grouping pages, and append new pages
until they are assigned to a group.
