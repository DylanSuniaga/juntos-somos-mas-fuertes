# Image slots

Drop real photos here, then pass the path to the matching section's
`PlaceholderImage` via its `src` prop (e.g. `src="/images/hero.jpg"`). Until a
file exists, the section shows a labeled placeholder with the brief's guidance —
no layout change on swap. Use `next/image`-friendly formats (`.jpg`/`.webp`).

| Suggested file | Section | Brief guidance | Target crop |
|---|---|---|---|
| `hero.jpg` | Hero | Horizontal, high impact. Real MÍA community — leadership, unity, hope, diversity, purpose. **No stock.** | 16:8 wide |
| `why-mia.jpg` | ¿Por qué MÍA? | Karen with members of the MÍA community. | 4:5 portrait |
| `why-matters.jpg` | ¿Por qué importa? | Authentic documentary photo — dignity + hope. | 4:5 portrait |
| `campaign.jpg` | Campaña | Real photo tied to the Miami 2026 Influence Gala. | 4:3 |
| `closing.jpg` | Cierre | The most moving photo — unity, hope, community. | 16:7 wide |
| `team/<name>.jpg` | Fundadoras & Junta | Portrait per person (set `photo` in `lib/team.ts`). | 1:1 square |

Karen's photos may be low-res — `object-cover` crops them to the target ratio,
so favor images at least as wide as the crop (hero/closing ≈ 1600px wide).
