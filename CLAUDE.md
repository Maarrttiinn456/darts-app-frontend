# Šipkařská aplikace — CLAUDE.md

## Co stavíme

Webová aplikace (mobilní first) pro zaznamenávání šipkařských výsledků.
Organizační struktura: **Liga → Turnaj → Hra**.
Realtime aktualizace skóre pomocí WebSocket/SSE.

---

## Tech stack

### Frontend

- TypeScript
- React 19
- React Router v7 — declarative mode
- React Query — server state, cache invalidace
- Tailwind CSS
- shadcn/ui

### Backend

- TypeScript
- Express
- Neon (PostgreSQL)
- Drizzle ORM
- WebSocket nebo SSE pro realtime

---

## Doménový model

### Liga

- Může ji vytvořit jakýkoliv přihlášený uživatel → stává se **adminem ligy**
- Admin při vytvoření vybere hráče z existujících registrovaných uživatelů
- **Složení ligy je po vytvoření uzamčeno** — hráče nelze přidávat ani odebírat
- Admin má extra práva: zakládání turnajů, editace výsledků
- Liga agreguje výsledky ze všech svých turnajů

### Turnaj

- Turnaj vždy hrají **všichni hráči dané ligy** — bez výjimky
- Hry v turnaji probíhají **sekvenčně** (jedna hra najednou)
- Turnaj agreguje výsledky všech her do turnajové tabulky

### Hra

- Každý hráč hraje **každou hru** v turnaji
- Dostupné módy: `301` | `501` | `Cricket` | _(rozšiřitelné)_
- Skórování je **čistě manuální** — admin zadá každému hráči přímo N bodů
- Cricket nemá speciální logiku, funguje stejně jako ostatní módy
- Skórování nelze nastavit plošně — každá hra je jiná, rozhoduje lidský faktor

---

## Obrazovky

| Screen | Popis                                                                  |
| ------ | ---------------------------------------------------------------------- |
| 1a     | Přihlášení                                                             |
| 1b     | Registrace                                                             |
| 2      | Výpis všech lig + tlačítko „Přidat ligu"                               |
| 3      | Detail ligy — turnaje, ligová tabulka, grafy, tlačítko „Přidat turnaj" |
| 4      | Detail turnaje — aktuální skóre, tabulka, tlačítko „Přidat hru"        |
| 5      | Aktivní hra — manuální counter per hráč, celkové skóre live            |

---

## Statistiky a grafy

Sledované metriky per hráč (na úrovni ligy i turnaje):

- Celkový počet bodů
- Počet vyhraných her (celkem i per typ hry — 301, 501, Cricket...)
- Počet vyhraných turnajů
- Procentuální úspěšnost vyhraných her
- Procentuální úspěšnost vyhraných turnajů

Výhledy do budoucna: další metriky budou přibývat podle potřeby.

---

## Realtime

- Skóre se aktualizuje **live** — ostatní hráči vidí změny bez manuálního refreshe
- Implementovat přes WebSocket nebo SSE na Express backendu
- React Query invalidace / subscription na frontendu

---

## Klíčová pravidla a omezení

1. **Liga je uzamčena po vytvoření** — nikdy nepřidávej UI ani endpoint pro změnu členů ligy po jejím založení
2. **Skórování je vždy manuální** — neimplementuj automatický výpočet bodů z herní logiky (žádné pravidla 301/501 na backendu)
3. **Každý hráč hraje každou hru** — při vytváření hry se automaticky vytvoří záznamy pro všechny hráče ligy
4. **Hry v turnaji jsou sekvenční** — neumožňuj spustit novou hru dokud není předchozí ukončena
5. **Mobilní first** — všechny komponenty navrhuj primárně pro mobilní zobrazení

---

## Konvence

- Komentáře a názvy proměnných: **anglicky**
- UI texty: **česky** (aplikace je primárně pro české uživatele)
- Drizzle schéma: snake_case názvy sloupců
- React Router v7 — používej **declarative mode** (ne framework mode)
- React Query — vždy invaliduj správné query keys po mutacích
