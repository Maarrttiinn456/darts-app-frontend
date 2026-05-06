# Design System

## Theme

Dark. Hospodský podvečer — teplé světlo, dřevo, šero. Základní barva není neutrální šedá (zinc), ale hluboká teplá tmavá s nádechem jantaru. Primární akcent je zlatý jantar, ne oranžová — blíže k mosazné armatuře terče než k reklamní barvě.

## Color Strategy

**Restrained** — teplá tmavá základna + jeden akcent (jantar) do 15 % plochy.

### Palette

| Token                  | OKLCH                      | Účel                                  |
| ---------------------- | -------------------------- | ------------------------------------- |
| `--background`         | `oklch(0.12 0.012 50)`     | Hlavní pozadí stránky                 |
| `--card`               | `oklch(0.16 0.010 50)`     | Povrch karet a panelů                 |
| `--popover`            | `oklch(0.16 0.010 50)`     | Dropdown, tooltip, dialog             |
| `--foreground`         | `oklch(0.93 0.008 75)`     | Primární text — teplá bílá            |
| `--card-foreground`    | `oklch(0.93 0.008 75)`     | Text na kartách                       |
| `--popover-foreground` | `oklch(0.93 0.008 75)`     | Text v popoverech                     |
| `--primary`            | `oklch(0.73 0.16 75)`      | Akcent — mosazný jantar               |
| `--primary-foreground` | `oklch(0.12 0.012 50)`     | Text na primary prvcích               |
| `--secondary`          | `oklch(0.22 0.010 50)`     | Sekundární povrch, hover state        |
| `--secondary-foreground` | `oklch(0.85 0.008 75)`   | Text na secondary prvcích             |
| `--muted`              | `oklch(0.20 0.008 50)`     | Deaktivované povrchy                  |
| `--muted-foreground`   | `oklch(0.52 0.008 75)`     | Popisky, metadata, placeholder        |
| `--accent`             | `oklch(0.22 0.010 50)`     | Subtle highlight, hover               |
| `--accent-foreground`  | `oklch(0.93 0.008 75)`     | Text na accent povrchu                |
| `--destructive`        | `oklch(0.55 0.18 22)`      | Mazání, chyba, varování               |
| `--destructive-foreground` | `oklch(0.93 0.008 75)` | Text na destructive prvcích           |
| `--border`             | `oklch(0.25 0.008 50)`     | Hranice, oddělovače                   |
| `--input`              | `oklch(0.20 0.008 50)`     | Pozadí inputů                         |
| `--ring`               | `oklch(0.73 0.16 75)`      | Focus ring — stejný jako primary      |

### Sémantické barvy (výsledky her)

| Token            | OKLCH                  | Účel         |
| ---------------- | ---------------------- | ------------ |
| `--result-win`   | `oklch(0.62 0.16 145)` | Výhra        |
| `--result-loss`  | `oklch(0.55 0.18 22)`  | Prohra       |
| `--result-draw`  | `oklch(0.52 0.008 75)` | Remíza       |

## Typography

**Font:** Geist Variable (`@fontsource-variable/geist`) — čistý, geometrický, čitelný na malých velikostech.

### Hierarchy

| Úroveň       | Použití                       | Tailwind                        |
| ------------ | ----------------------------- | ------------------------------- |
| Display      | Skóre, velká čísla            | `text-5xl font-black`           |
| Heading 1    | Název ligy, turnaje           | `text-2xl font-black uppercase tracking-widest` |
| Heading 2    | Název sekce, hráče            | `text-lg font-bold uppercase tracking-wider` |
| Body         | Popisky, výsledky             | `text-sm`                       |
| Label        | Pole formuláře, metadata      | `text-[10px] uppercase tracking-[0.14em] text-muted-foreground` |
| Score        | Aktuální skóre v živé hře     | `text-6xl font-black tabular-nums` |

Čísla (skóre, statistiky) vždy `tabular-nums` pro zarovnaný sloupec.
Nadpisy vždy `uppercase` s rozšířeným letter-spacing — dává aplikaci charakter bez okázalosti.

### Line length

Body text max `65ch`. Karty a panely max `48ch`.

## Shape & Radius

`--radius: 0rem` — nulové zaoblení. Ostré rohy jsou záměr: přímočarost, žádný záhybový komfort. Jak výsledkový arch na tabuli.

## Spacing

Variabilní rytmus — ne všude stejné odsazení.

| Token        | Hodnota | Použití                              |
| ------------ | ------- | ------------------------------------ |
| `--space-xs` | `4px`   | Mezera uvnitř labelu, badge          |
| `--space-sm` | `8px`   | Mezera mezi label a input            |
| `--space-md` | `16px`  | Padding karty (mobilní)              |
| `--space-lg` | `24px`  | Sekce uvnitř stránky                 |
| `--space-xl` | `40px`  | Mezi hlavními sekcemi                |
| `--space-2xl`| `64px`  | Hero, top padding stránky            |

## Motion

Minimální. Jen přechody pro interakci (hover, focus), žádné dekorativní animace.

- Trvání: `150ms` pro hover/focus, `200ms` pro vstup prvků
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quint)
- Nikdy neanimovat `height`, `width`, layout properties

## Components (shadcn/ui)

Všechny shadcn komponenty automaticky dědí CSS tokeny. Specifické overrides:

### Button

- Primární: `bg-primary text-primary-foreground` — mosazný jantar, tmavý text
- Výška: `h-12` (48px) — dostatečný touch target
- Font: `font-black uppercase tracking-[0.2em]`
- Hover: zesvětlení primary o 1 krok lightness

### Input

- Background: `bg-input` (tmavší než card)
- Border: `border-border`
- Focus: `ring-ring ring-1 ring-offset-0`
- Výška: `h-11` (44px)

### Badge (výsledky)

- Win: `bg-[--result-win] text-foreground`
- Loss: `bg-[--result-loss] text-foreground`
- Draw: `bg-muted text-muted-foreground`

## Anti-patterns

- Žádné barevné pruhy na levém okraji karet (`border-left` jako dekorativní akcent)
- Žádný gradient text
- Žádné nested karty
- Žádné identické icon+heading+text mřížky
- Žádné boxy se stínem jako primární plocha (karty rozliš barvou, ne shadow)
