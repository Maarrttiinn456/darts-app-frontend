# Šipkařská aplikace — Frontend

## Co stavíme

Webová aplikace (mobilní first) pro zaznamenávání šipkařských výsledků.
Organizační struktura: **Liga → Turnaj → Hra**.
Realtime aktualizace skóre pomocí SSE.

---

## Tech stack

- TypeScript
- React 19
- React Router v7 — **declarative mode** (`<BrowserRouter>`, `<Routes>`, `<Route>`)
- React Query — server state, cache invalidace
- Tailwind CSS
- shadcn/ui

---

## Struktura projektu

```
src/
├── router/
│   └── index.tsx          # všechny routes na jednom místě
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── leagues/
│   │   ├── LeaguesPage.tsx
│   │   └── LeagueDetailPage.tsx
│   ├── tournaments/
│   │   └── TournamentDetailPage.tsx
│   └── games/
│       └── GamePage.tsx
├── components/
│   ├── ui/                # shadcn komponenty (negeneruj ručně, používej CLI)
│   └── app/               # vlastní komponenty aplikace
├── hooks/                 # custom hooks + React Query hooks
├── api/                   # fetch funkce per doména (auth, leagues, tournaments, games)
├── lib/
│   ├── api.ts             # axios instance, base URL, auth header
│   └── queryClient.ts     # React Query konfigurace
└── types/
    └── api.ts             # generováno z backendu přes openapi-typescript
```

---

## Typy

Typy jsou **generované automaticky** z OpenAPI schématu backendu. Nikdy je nepište ručně.

```bash
# Příkaz pro regeneraci typů (spusť po každé změně backendu)
npx openapi-typescript http://localhost:3000/api-docs -o src/types/api.ts
```

Importuj typy vždy z `src/types/api.ts`:

```ts
import type { League, Tournament, Game, GameScore } from '@/types/api';
```

---

## Obrazovky

| Screen | Route                                          | Popis                                               |
| ------ | ---------------------------------------------- | --------------------------------------------------- |
| 1a     | `/login`                                       | Přihlášení                                          |
| 1b     | `/register`                                    | Registrace                                          |
| 2      | `/leagues`                                     | Výpis všech lig + tlačítko „Přidat ligu"            |
| 3      | `/leagues/:leagueId`                           | Detail ligy — turnaje, ligová tabulka, grafy        |
| 4      | `/leagues/:leagueId/tournaments/:tournamentId` | Detail turnaje — skóre, tabulka, hry                |
| 5      | `/games/:gameId`                               | Aktivní hra — manuální counter per hráč, live skóre |

---

## Statistiky a grafy

Sledované metriky per hráč (na úrovni ligy i turnaje):

- Celkový počet bodů
- Počet vyhraných her (celkem i per typ — 301, 501, Cricket...)
- Počet vyhraných turnajů
- Procentuální úspěšnost vyhraných her
- Procentuální úspěšnost vyhraných turnajů

---

## Realtime (SSE)

Backend posílá SSE eventy při každé změně skóre. Frontend naslouchá a invaliduje React Query cache.

```ts
// Vzor pro SSE subscription
const eventSource = new EventSource(`/api/games/${gameId}/stream`);
eventSource.onmessage = () => {
    queryClient.invalidateQueries({ queryKey: ['game', gameId] });
};
```

Nikdy nepoužívej WebSocket — pro tento use case stačí SSE (jednosměrný push ze serveru).

---

## Klíčová pravidla

1. **Declarative mode** — používej `<BrowserRouter>`, `<Routes>`, `<Route>`. Nikdy `createBrowserRouter`.
2. **Typy negeneruj ručně** — vždy použij `openapi-typescript` generátor.
3. **Mobilní first** — všechny komponenty navrhuj primárně pro mobilní zobrazení (390px).
4. **React Query invalidace** — po každé mutaci invaliduj správné query keys.
5. **shadcn komponenty** — přidávej přes CLI (`npx shadcn@latest add button`), nikdy ručně do `ui/`.
6. **Liga uzamčena** — nikdy nepřidávej UI pro změnu členů ligy po jejím založení.
7. **Skórování je manuální** — žádná herní logika na frontendu, jen input → API call.

---

## Konvence

- Komentáře a názvy proměnných: **anglicky**
- UI texty: **česky**
- Komponenty: PascalCase (`LeagueCard.tsx`)
- Hooks: camelCase s prefixem `use` (`useLeagues.ts`)
- React Query keys: pole stringů `['leagues']`, `['league', id]`, `['game', id]`
- Tailwind: mobilní třídy jako základ, breakpointy `md:` a `lg:` pro větší obrazovky
