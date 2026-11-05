// Génère les formes pinceau Oh My Datte dans public/images/pinceaux/.
//
// Chaque forme est un masque : seul son alpha compte, la couleur vient d'un
// token CSS (mask-image + background-color).
//
// Un trait est construit comme un vrai pinceau sec : des dizaines de poils
// vectoriels parallèles, qui partent presque ensemble (attaque nette) et
// s'arrêtent à des longueurs différentes (levée striée). Les poils du bord
// sont plus courts, ce qui arrondit le geste. Aucun flou : le bord reste net
// et précis, la matière vient des stries et non d'une tache qui bave.
// Un léger déplacement donne le grain du papier sur le contour.
//
// Usage : node scripts/brushes/generate.mjs

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const outDir = join(root, 'public', 'images', 'pinceaux')
mkdirSync(outDir, { recursive: true })

// PRNG déterministe : les formes ne changent pas d'une génération à l'autre.
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Ondulation lisse (somme de sinus à phases aléatoires), valeur dans [-1, 1].
function wobble(rand, octaves = 3) {
  const waves = Array.from({ length: octaves }, (_, i) => ({
    f: (i + 1) * (0.6 + rand() * 0.8),
    p: rand() * Math.PI * 2,
    a: 1 / (i + 1.3),
  }))
  const norm = waves.reduce((n, w) => n + w.a, 0)
  return (t) => waves.reduce((v, w) => v + w.a * Math.sin(w.f * Math.PI * 2 * t + w.p), 0) / norm
}

const r1 = (n) => Math.round(n * 10) / 10

/**
 * Un geste de pinceau horizontal, de x0 à x0 + length, centré sur y.
 * Retourne une liste de chemins (un par poil).
 */
function stroke({
  x0 = 0, y = 0, length, thickness, seed,
  bristles = 46,
  attack = 0.05,   // part de la longueur où l'attaque s'arrondit
  tail = 0.28,     // part de la longueur où les poils s'arrêtent
  dry = 0.55,      // 0 : levée régulière, 1 : poils très inégaux
  curve = 0.05,    // courbure du geste, en part de l'épaisseur
  breath = 0.08,   // variation d'épaisseur le long du geste
  samples = 22,
  reverse = false, // geste de droite à gauche
}) {
  const rand = rng(seed)
  const spine = wobble(rand, 2)
  const swell = wobble(rand, 3)
  const clumps = wobble(rand, 4)   // les poils se regroupent en mèches
  const loadStart = wobble(rand, 3)
  const half = thickness / 2
  const paths = []

  const segment = (v, w, jitter, from, to, taperIn, taperOut) => {
    const up = []
    const down = []
    for (let s = 0; s <= samples; s++) {
      const u = s / samples
      const x = from + (to - from) * u
      const t = x / length
      const thick = 1 + swell(t * 1.3) * breath
      const cy = y + spine(t) * thickness * curve + (v + jitter) * half * thick
      // le poil s'affine vers sa pointe (et à l'entrée d'un trou de matière)
      // attaque : chaque poil part d'une pointe arrondie, pas d'une coupe nette
      // (c'est ce qui donnait un contour en escalier)
      let k = u < 0.1 ? 0.3 + 0.7 * Math.sqrt(u / 0.1) : 1
      if (taperOut && u > 0.8) k = Math.min(k, 1 - ((u - 0.8) / 0.2) * 0.85)
      if (taperIn && u < 0.2) k = Math.min(k, 0.15 + (u / 0.2) * 0.85)
      const hw = (w / 2) * k
      const px = reverse ? x0 + length - x : x0 + x
      up.push([px, cy - hw])
      down.push([px, cy + hw])
    }
    const pts = [...up, ...down.reverse()]
    // même sens de parcours pour tous les poils : les chevauchements restent pleins
    if (reverse) pts.reverse()
    return 'M' + pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join('L') + 'Z'
  }

  for (let i = 0; i < bristles; i++) {
    const v = (i + 0.5) / bristles * 2 - 1        // position dans l'épaisseur
    const edge = Math.abs(v)
    // attaque : bout arrondi et chargé, les poils du bord commencent plus tard
    const start = length * attack * (edge ** 2 + 0.25 * (1 + loadStart(v * 1.7))) + rand() * length * 0.003
    // levée : poils du bord plus courts, mèches inégales, aléa "pinceau sec"
    const clump = (clumps(v * 2.6) + 1) / 2
    const dryCut = (rand() ** 1.8) * dry
    const end = length * (1 - tail * (0.08 + 0.5 * edge ** 1.7 + 0.35 * clump + 0.45 * dryCut))
    const w = (thickness / bristles) * (1.9 + rand() * 0.9)
    const jitter = (rand() - 0.5) * 0.25 / bristles * 2
    // quelques poils manquent de matière vers la fin : un trou, puis ils reprennent
    if (rand() < dry * 0.32 && end - start > length * 0.5) {
      const gapAt = end - length * tail * (0.35 + rand() * 0.6)
      const gapLen = length * (0.02 + rand() * 0.06)
      paths.push(segment(v, w, jitter, start, gapAt, false, true))
      if (gapAt + gapLen < end - length * 0.02) paths.push(segment(v, w * 0.8, jitter, gapAt + gapLen, end, true, true))
    } else {
      paths.push(segment(v, w, jitter, start, end, false, true))
    }
  }
  return paths
}

const paperFilter = (scale = 3, freq = 0.06) => `<filter id="p" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="5" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G"/>
</filter>`

function svg({ w, h, paths, transform = '', preserve, filter = paperFilter(), extra = '' }) {
  const par = preserve ? ` preserveAspectRatio="${preserve}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"${par}>
<defs>${filter}</defs>
<g filter="url(#p)" fill="#000"${transform ? ` transform="${transform}"` : ''}>${extra}<path d="${paths.join('')}"/></g>
</svg>
`
}

const files = {}

// 1. Tuile datte : geste horizontal calme, long et presque à plat, posé sous
//    chaque datte (580 x 236). Bords réguliers, levée sèche à droite.
files['tuile.svg'] = svg({
  w: 580, h: 236,
  paths: stroke({ x0: 16, y: 118, length: 548, thickness: 172, seed: 41, bristles: 72, attack: 0.07, tail: 0.24, dry: 0.45, curve: 0.025, breath: 0.03 }),
  filter: paperFilter(2, 0.06),
})

// 2. Trait vertical : section Qualité, geste de haut en bas aux bords
//    presque droits (ni règle, ni vague).
files['trait-vertical.svg'] = svg({
  w: 300, h: 900,
  // dessiné à l'horizontale puis tourné d'un quart de tour
  paths: stroke({ x0: 20, y: 150, length: 860, thickness: 206, seed: 8, bristles: 80, attack: 0.05, tail: 0.16, dry: 0.45, curve: 0.03, breath: 0.03 }),
  transform: 'rotate(90 150 150)',
  filter: paperFilter(2, 0.06),
})

// 3. Bord de l'aplat cacao : trois gestes horizontaux qui se chevauchent,
//    posés sur un corps plein. Le haut du fichier est le bord brossé, le bas
//    rejoint l'aplat. Retourné en CSS (scaleY(-1)) pour le bord inférieur.
files['bord-aplat.svg'] = (() => {
  const w = 2400, h = 220
  // gestes alternés (aller, retour), à des hauteurs différentes : leurs levées
  // dépassent sur le creme et donnent un bord peint, pas découpé
  const passes = [
    stroke({ x0: -100, y: 104, length: 1050, thickness: 112, seed: 31, bristles: 38, attack: 0.04, tail: 0.2, dry: 0.75, curve: 0.2 }),
    // geste central, le plus haut : c'est lui qu'on voit sur mobile
    stroke({ x0: 620, y: 86, length: 1160, thickness: 118, seed: 32, bristles: 38, attack: 0.04, tail: 0.2, dry: 0.75, curve: 0.16, reverse: true }),
    stroke({ x0: 1480, y: 110, length: 1040, thickness: 110, seed: 34, bristles: 38, attack: 0.04, tail: 0.2, dry: 0.75, curve: 0.2 }),
  ].flat()
  // corps plein : commence sous les gestes, va jusqu'au bas du fichier
  const body = `<rect x="-20" y="128" width="${w + 40}" height="${h}"/>`
  return svg({ w, h, paths: passes, preserve: 'xMidYMax slice', extra: body, filter: paperFilter(4, 0.05) })
})()

// 4. Grain papier : bruit fin teinté chocolat, tuile raccordée de 220 px.
files['grain.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
<filter id="g" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="2" stitchTiles="stitch"/>
  <feColorMatrix values="0 0 0 0 0.353  0 0 0 0 0.243  0 0 0 0 0.212  2 0 0 0 -1.02"/>
</filter>
<rect width="220" height="220" filter="url(#g)"/>
</svg>
`

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(outDir, name), content)
  console.log(`${name}  ${(content.length / 1024).toFixed(1)} kB`)
}
