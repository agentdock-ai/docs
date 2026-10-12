# Agentdock website design system

The website presents one connection: an application-owned LangGraph agent,
Agentdock serving and contracts, and an optional editable React interface.
Product claims follow the core and UI READMEs. The published UI installer is
`@agentdock-ai/agentdock-ui`; it adds editable React chat source to an app.

## Visual language

Warm paper, charcoal ink, restrained orange actions, olive infrastructure surfaces,
and lilac UI surfaces. The interface is the hero visual. Avoid decorative stock
imagery, fabricated metrics, and claims that the preview calls real services.

Tokens live under `.ad-site` in `app/global.css` so docs theme styles remain independent.

| Token          | Value     | Purpose                           |
| -------------- | --------- | --------------------------------- |
| `--ad-bg`      | `#f9f8f5` | Canvas                            |
| `--ad-surface` | `#ffffff` | Interactive preview               |
| `--ad-ink`     | `#252722` | Primary text                      |
| `--ad-muted`   | `#73756c` | Body and secondary text           |
| `--ad-line`    | `#e1e2d9` | Dividers                          |
| `--ad-accent`  | `#c54f2a` | Primary actions and hero emphasis |
| `--ad-lilac`   | `#eeedf7` | UI product surface                |
| `--ad-green`   | `#4d725b` | Successful demo state             |

Use local Arial/Helvetica and system monospace with no external font fetch.
Large headings use tight tracking; reading text uses generous line height.
A 1200px container aligns all sections. Spacing follows a 4px baseline. Section
intervals are 72px on desktop, 60px on tablets, and 48px on phones. Product cards
use 24px padding on desktop. Cards use 6–12px radii, fine borders, and soft shadows.
Primary actions are 40px tall with 12px type, 14px horizontal padding, and a 12px
icon gap. On phones, actions retain a 44px touch target. Keep the demo compact by
using natural transcript height rather than reserving empty space.

## Components and behavior

`components/landing.tsx` owns the preview, copy feedback, tabs, navigation, FAQ,
the copyable `/skills.md` implementation prompt, and reusable icon/button
styles. The page entry remains a server component. The prompt asks app-specific
questions before proposing implementation.

- Primary buttons use orange; secondary actions use borders or inline arrows.
- The compatibility row uses text labels. Do not substitute generic interface
  icons for technology logos. The Agentdock header and footer use the real logo.
- The preview switches between three illustrative scenarios. Tool results disclose
  detail. Approval advances to a brief local running state; decline preserves a
  draft; replay restores pending approval. It sends no network requests.
- Copy buttons report success or failure. Integration tabs support arrow keys,
  Home, and End; only the active tab participates in sequential keyboard focus.
- Native details elements provide accessible FAQ disclosure.
- Mobile navigation closes after selection or Escape, restoring toggle focus on Escape.
- The footer credits Muhammad Zain with a link to `https://muhammad-zain.com` on
  every screen size.
- Visible focus rings, a skip link, labelled sections, and reduced-motion handling
  are required. Tiny decorative labels never carry the only explanation of behavior.
- At 850px the hero and developer section stack; at 600px product cards stack
  and navigation becomes a menu. Code can scroll inside its panel, never the page.

The homepage uses its own light canvas regardless of the docs' saved theme.
Docs retain the Fumadocs light/dark theme and existing logo switching.

## Icons and motion

Use named Lucide React imports for interface icons, consistent 20px sizing and
1.6px strokes. Decorative icons are hidden from assistive technology; their
accompanying text or button label supplies the accessible name.

GSAP provides a short staggered hero entrance, an underline reveal, and once-only
section entrances (18–22px movement, 0.65–0.85 seconds). Demo state changes and
integration tabs use a 10px, 0.42-second fade and entrance. The scenario selector
slides its active indicator over 0.38 seconds, and tool details expand and collapse
over 0.32 seconds. Approval results and FAQ answers enter over 0.38 seconds. Copy
confirmation briefly scales its checkmark. Hover arrows move 3px, cards lift 2–3px,
and actions have press feedback. Keep native scrolling and avoid looping decoration.

Motion runs only when `prefers-reduced-motion: no-preference` matches. MatchMedia
contexts revert animations and scroll triggers on unmount or preference changes.
HTML remains visible before JavaScript initializes.

Docs use three expanded, collapsible navigation groups with native branch lines,
a short Overview label, and a connected heading tree in the table of contents.
Article titles, routes, search, mobile navigation, and theme selection stay under
Fumadocs. Preserve source node references when grouping pages, and append new pages
until they are assigned to a group.
