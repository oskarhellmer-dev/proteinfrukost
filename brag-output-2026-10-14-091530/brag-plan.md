# Brag Plan: Proteinfrukost

## What is this app?
En svensk receptsajt med proteinrika frukostrecept — pannkakor, gröt, smoothies, mellanmål — med näringsvärden per portion. Den löser "hungrig klockan 10"-problemet med riktiga proteinmängder, inte påståenden.

## The angle
Frukost är den måltid alla äter och ingen tänker på proteinned. Videon tar den lilla vardagliga irritationen ("hungrig igen efter en timme") och svarar med sajtens sakliga motbevis: recept med 30–45 g protein per portion, visat siffra för siffra. Varmt och aptitligt, inte säljigt.

## Hook (first 2-3 seconds)
"Klockan 10. Redan hungrig." — stor text på kräm-bakgrund, en stilla sensorisk känsla (ett tick, en paus). Relaterbart i 2 sekunder.

## Key moments (the middle)
- Receptkorten glider in **ett i taget** — Proteinpannkakor, Proteinrik gröt, Proteinsmoothie, Overnight oats — var och en med litet kortljud.
- Näringstabellen som riktigt UI-element: proteinnivån **räknar upp** (t.ex. 0 → 42 g) per portion. Sakligt, trovärdigt.
- Sökfältet: simulera att man söker "proteinpannkakor" — text skrivs tecken för tecken med klickljud.

## Outro / punchline
"Proteinrik frukost som faktiskt mättar." → sajtens namn **proteinfrukost.se** i grönt. Mjuk, mättnadskänsla, inga utropstecken.

## User flow worth showing
none — landing-page only. Bygger på starkaste visuella element (receptkort, kategorier, näringstabell, sökfält) enligt Key moments.

## Tone
- Preset: default
- Creative direction: varm, aptitlig svensk frukostrecept-vibe — "mat som mättar på riktigt"
- Interpretation: lugnt tempo, ärliga siffror, mycket "luft", inga superlativ. Förtroende snarare än hype.

## Format: landscape — 1920x1080
## Duration: 18 seconds

## Visual identity (from the project)
- Background: #fdfaf5 (cream)
- Accent: #e8a53d (amber)
- Text: #1c1c1c (ink)
- Display font: system-ui (Inter-lik), tung vikt för rubriker
- Body font: -apple-system / Segoe UI-stack
- Strongest visual element: receptkort (grön tagg + bild + rubrik), kategorirutnätet, näringstabellen, det gröna nyhetsbrevet
- Brand green: #1f7a4d, mörk grön #155c39, linje #e6e0d6

## Share copy (draft)
"Hängig klockan 10? Frukosten. Här är proteinrika recept med näringsvärden per portion — proteinfrukost.se"

## Audio direction
- Role: varm musikbädd + sparsmakade proffsiga accenter
- Music: happig business-moves-track (bunden), låg volym, mjuk fade-in/ut
- Music treatment: start ~0.3s, dämpad under text (vocals om någon), fade ut sista 0.8s
- Music cue guidance: bunden track har förberäknade cues i assets/music/cues/; rikta 2-3 starka cues mot hook-reveal och outro; beat-grid-fönster för receptkortens sekventiella inkomst
- Audio-reactive treatment: subtil; låt musikenergi andas i hero-glow och kortnärvaro, inga vågformsstaplar
- SFX posture: sparsmakad–måttlig, rörelsematchad (kortljud, klick, en mjuk "pop" för siffereffekten)
- Audio-coupled moments: sökfältet (tecken-tangenter), receptkort ett-i-taget (kortljud), protein-räknaren (tickande steg)
- Restraint rule: inga ljudeffekter som överrör maten; inget skräp, inga skämtljud

## Storyboard

### Scene 1 — Hook — 2.5s
Kräm-bakgrund (#fdfaf5). Rad 1 tonar in: "Klockan 10." sedan "Redan hungrig." i stor tung typ (ink). Diskret mörk-grön linje dras under.
Sequential/interaction: yes — två rader, rad 1 kort paus innan "Redan hungrig." landar.
Audio intent: tyst spänning, ett enda mjukt tick.
Audio-coupled idea: ett tick när andra raden landar.
Music: låg varm bädd
Transition mood: soft crossfade → Scene 2

### Scene 2 — Reveal — 3s
Ordet "Frukosten." på kräm, sedan sajtens hero: "Proteinrik frukost som faktiskt mättar" i grönt (#1f7a4d) med amber-accent. Receptbild antyds i bakgrunden med låg opacitet.
Sequential/interaction: yes — "Frukosten." pinnar in, sedan hero-rubriken.
Audio intent: lätt lättnad, musiken lyfter.
Audio-coupled idea: mjuk whoosh på hero.
Music: bädd stiger
Transition mood: clean wipe → Scene 3

### Scene 3 — Receptkorten — 6s
Kategori-etikett "Populära recept". Fyra receptkort glider in ett i taget från vänster/botten: Proteinpannkakor, Proteinrik gröt, Proteinsmoothie, Overnight oats. Varje kort: grön tagg + rubrik + liten bildyta. Håller kvar alla fyra i slutet.
Sequential/interaction: yes — ett kort i taget, kortljud per ankomst; håll hela setet synligt efter sista.
Audio intent: rytmisk men lugn uppbyggnad.
Audio-coupled idea: kortljud per kort, snäpp till beats.
Music: bädd jämn
Transition mood: clean slide → Scene 4

### Scene 4 — Siffran som bevisar — 4s
Näringstabell-UI (vit kort, grön header): en stor siffra räknar upp 0 → 42 g protein per portion, med etiketten "per portion". Under: två små rader (t.ex. 380 kcal, 6 g fett). Sakligt, trovärdigt.
Sequential/interaction: yes — siffran tickar upp; raderna tonar in efteråt.
Audio intent: tillfredsställande "klick" när siffran landar.
Audio-coupled idea: tickande under uppräkningen, mjuk pop vid 42.
Music: bädd jämn
Transition mood: soft crossfade → Scene 5

### Scene 5 — Outro — 2.5s
"Proteinrik frukost som faktiskt mättar." i ink, sedan **proteinfrukost.se** i grönt (#1f7a4d) stort. Amber-accent som liten understrykning. Lång mjuk hold, musik fadear ut.
Sequential/interaction: yes — tagline, sedan namn.
Audio intent: varm avslutning, mättnad.
Audio-coupled idea: none (eller ett enda mjukt logo-hit).
Music: fade ut

**Music mood for this video:** upplyftande, varm, aptitlig
**Audio summary:** låg varm bädd som bär en lugn, ärlig uppbyggnad — tick/kortljud matchar rörelse, mjuk fade mot mättande outro.
