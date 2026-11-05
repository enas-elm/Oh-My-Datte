import { DATTE_IDS, type DatteId } from './dattes'

export const DATTES_PAR_COFFRET = 3

export type CompositionMode = 'equilibre' | 'sur-mesure'

export type Composition = {
  mode: CompositionMode
  /** Nombre total de chaque datte sur la commande */
  dattes: Record<DatteId, number>
}

export function totalAttendu(coffrets: number): number {
  return Math.max(0, Math.floor(coffrets)) * DATTES_PAR_COFFRET
}

export function sommeDattes(dattes: Record<DatteId, number>): number {
  return DATTE_IDS.reduce((n, id) => n + (dattes[id] ?? 0), 0)
}

/** Répartit les dattes de la commande aussi également que possible. */
export function repartitionEquilibree(coffrets: number): Record<DatteId, number> {
  const total = totalAttendu(coffrets)
  const base = Math.floor(total / DATTE_IDS.length)
  const reste = total % DATTE_IDS.length
  return Object.fromEntries(DATTE_IDS.map((id, i) => [id, base + (i < reste ? 1 : 0)])) as Record<DatteId, number>
}

/**
 * Valide une composition reçue du formulaire. Retourne la composition
 * nettoyée, ou une erreur lisible si le total ne correspond pas aux coffrets.
 */
export function validerComposition(
  raw: unknown,
  coffrets: number,
): { ok: true; composition: Composition } | { ok: false; erreur: string } {
  const input = (raw ?? {}) as { mode?: unknown; dattes?: Record<string, unknown> }

  if (input.mode !== 'sur-mesure') {
    return { ok: true, composition: { mode: 'equilibre', dattes: repartitionEquilibree(coffrets) } }
  }

  const dattes = Object.fromEntries(
    DATTE_IDS.map((id) => {
      const n = Number(input.dattes?.[id])
      return [id, Number.isFinite(n) && n > 0 ? Math.floor(n) : 0]
    }),
  ) as Record<DatteId, number>

  const attendu = totalAttendu(coffrets)
  if (sommeDattes(dattes) !== attendu) {
    return { ok: false, erreur: `La composition doit compter ${attendu} dattes au total.` }
  }
  return { ok: true, composition: { mode: 'sur-mesure', dattes } }
}
