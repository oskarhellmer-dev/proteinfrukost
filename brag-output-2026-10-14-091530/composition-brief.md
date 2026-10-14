# Hyperframes Composition Brief: Proteinfrukost

## Objective
Kort lanserings-/brag-video för proteinfrukost.se (svensk proteinfrukost-receptsajt).

## Output
- Composition: `brag-output-2026-10-14-091530/composition/`
- Render: `brag-output-2026-10-14-091530/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 18 s

## Source Material
- Project root: /home/clawd/proteinfrukost
- Lästa filer: index.html, style.css
- Produktnamn: Proteinfrukost (proteinfrukost.se)
- Tagline / starkaste claim: "Proteinrik frukost som faktiskt mättar"
- Nyckel-UI att återskapa: receptkort (grön tagg + rubrik), kategori-rutnät, näringstabell, sökfält
- Copy som MÅSTE stå ordagrant:
  - "Proteinrik frukost som faktiskt mättar"
  - "proteinfrukost.se"
  - receptnamn: Proteinpannkakor, Proteinrik gröt, Proteinsmoothie, Overnight oats

## Creative Direction
- Tone preset: default
- Creative direction: varm, aptitlig svensk frukost — "mat som mättar på riktigt"
- Interpretation: lugnt tempo, ärliga siffror, mycket luft, inga superlativ
- Hook: "Klockan 10. Redan hungrig."
- Outro: "Proteinrik frukost som faktiskt mättar." → proteinfrukost.se
- Avoid: generiskt SaaS-språk, abstrakt fyllande grafik

## Visual Identity
- Background: #fdfaf5
- Text: #1c1c1c
- Accent: #e8a53d
- Brand green: #1f7a4d, mörk grön #155c39, linje #e6e0d6
- Font: system-ui / sans-serif (ingen extern font)
- Visuella referenser: receptkort, kategorirutor, näringstabell, grön nyhetsbrev-panel

## Storyboard (från brag-plan.md)
1. Hook — 2.5 s — "Klockan 10." → "Redan hungrig."
2. Reveal — 3 s — "Frukosten." → hero "Proteinrik frukost som faktiskt mättar"
3. Receptkorten — 6 s — "Populära recept" + 4 kort ett i taget
4. Siffran — 4 s — näringskort, protein räknar upp 0→42 g/portion
5. Outro — 2.5 s — tagline → proteinfrukost.se

## Audio
- Role: varm musikbädd + sparsmakade accenter
- Music: assets/music/happy-beats-business-moves-vol-9-by-ende-dot-app.mp3 (tempo ~114,8 BPM), låg volym
- Music treatment: låg bädd; statisk volym (fade förenklad bort)
- Music cue guidance: bunden preset; beat-grid ~0,522 s; starka cues @1,07 / 3,70 s
- Audio-reactive: ingen (förenklat; dokumenterat)
- Audio-coupled moments:
  - beat-lock: "Redan hungrig." @1,07 s (strongCue)
  - beat-lock: hero @3,70 s (strongCue)
  - beat-grid: kort 1-4 @5,77 / 6,29 / 6,82 / 7,34 s
  - counter: klick @12,0 s; landning ~13,1 s
  - outro: "@16,22 s
- SFX: kortljud per kort, ett klick för räknaren, ett mjukt heavy för logotypen
- SFX-analys: assets/sfx/sfx-analysis.md

## Hyperframes Instructions
Bygg standalone-komposition enligt hyperframes-core. `npx hyperframes check` ska passera. Rendera lokalt.
