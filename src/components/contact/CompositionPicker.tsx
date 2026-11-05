"use client"

import { Minus, Plus } from "lucide-react"
import { products, type DatteId } from "@/lib/dattes"
import {
  repartitionEquilibree,
  sommeDattes,
  totalAttendu,
  type Composition,
  type CompositionMode,
} from "@/lib/composition"

type Props = {
  coffrets: number
  value: Composition
  onChange: (value: Composition) => void
  error?: boolean
}

const modes: { id: CompositionMode; label: string }[] = [
  { id: "equilibre", label: "Assortiment équilibré" },
  { id: "sur-mesure", label: "Je compose" },
]

const stepClass =
  "flex size-9 items-center justify-center rounded border-[0.5px] border-creme transition-colors duration-200 hover:bg-creme hover:text-rouge disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-creme focus-visible:outline-creme"

/**
 * Composition de la commande. « Assortiment équilibré » répartit les dattes
 * à parts égales ; « Je compose » donne un compteur par datte, dont la somme
 * doit égaler 3 dattes par coffret.
 */
export default function CompositionPicker({ coffrets, value, onChange, error }: Props) {
  const attendu = totalAttendu(coffrets)
  const disabled = coffrets <= 0
  const dattes = value.mode === "equilibre" ? repartitionEquilibree(coffrets) : value.dattes
  const total = sommeDattes(dattes)
  const ecart = attendu - total

  const setMode = (mode: CompositionMode) => {
    // on part toujours d'une répartition équilibrée, à ajuster ensuite
    onChange({ mode, dattes: repartitionEquilibree(coffrets) })
  }

  const setCount = (id: DatteId, n: number) => {
    onChange({ mode: "sur-mesure", dattes: { ...value.dattes, [id]: Math.max(0, n) } })
  }

  return (
    <fieldset disabled={disabled} aria-describedby="composition-aide composition-etat" className="min-w-0">
      <legend className="font-display text-lg font-semibold">Composition</legend>
      <p id="composition-aide" className="text-[13px] leading-snug text-on-rouge-doux">
        {disabled
          ? "Indiquez d'abord le nombre de coffrets."
          : `${attendu} dattes au total pour ${coffrets} coffret${coffrets > 1 ? "s" : ""}.`}
      </p>

      {/* Choix du mode */}
      <div role="radiogroup" aria-label="Mode de composition" className="mt-3 grid grid-cols-2 rounded border-[0.5px] border-creme p-1">
        {modes.map((m) => {
          const active = value.mode === m.id
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMode(m.id)}
              className={`rounded-[3px] px-2 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-creme ${
                active ? "bg-creme text-rouge" : "text-on-rouge-doux hover:text-creme"
              } disabled:cursor-not-allowed`}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Détail par datte */}
      <ul className={`mt-4 divide-y divide-ligne-sur-rouge ${disabled ? "opacity-50" : ""}`}>
        {products.map((p) => {
          const n = dattes[p.id] ?? 0
          return (
            <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block font-display text-[1.05rem] font-semibold leading-tight">{p.title}</span>
                <span className="block text-[13px] text-on-rouge-doux">{p.subtitle}</span>
              </span>

              {value.mode === "sur-mesure" ? (
                <span className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className={stepClass}
                    onClick={() => setCount(p.id, n - 1)}
                    disabled={disabled || n <= 0}
                    aria-label={`Retirer une datte ${p.title}`}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={attendu}
                    value={n}
                    onChange={(e) => setCount(p.id, Number(e.target.value) || 0)}
                    aria-label={`Nombre de dattes ${p.title}`}
                    className="w-12 bg-transparent text-center font-display text-xl font-semibold lining-nums tabular-nums [appearance:textfield] focus-visible:outline-creme [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    className={stepClass}
                    onClick={() => setCount(p.id, n + 1)}
                    disabled={disabled || total >= attendu}
                    aria-label={`Ajouter une datte ${p.title}`}
                  >
                    <Plus size={16} />
                  </button>
                </span>
              ) : (
                <span className="font-display text-xl font-semibold lining-nums tabular-nums">{disabled ? "–" : n}</span>
              )}
            </li>
          )
        })}
      </ul>

      {/* État du total */}
      {!disabled && value.mode === "sur-mesure" && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-ligne-sur-rouge pt-3 text-sm">
          <p id="composition-etat" aria-live="polite" className={error && ecart !== 0 ? "font-semibold text-creme" : "text-on-rouge-doux"}>
            {ecart === 0 && <>Composition complète&nbsp;: {total}&nbsp;/&nbsp;{attendu}</>}
            {ecart > 0 && <>Encore {ecart}&nbsp;datte{ecart > 1 ? "s" : ""} à placer ({total}&nbsp;/&nbsp;{attendu})</>}
            {ecart < 0 && <>{-ecart}&nbsp;datte{ecart < -1 ? "s" : ""} de trop ({total}&nbsp;/&nbsp;{attendu})</>}
          </p>
          <button
            type="button"
            onClick={() => onChange({ mode: "sur-mesure", dattes: repartitionEquilibree(coffrets) })}
            className="underline underline-offset-4 transition-colors hover:text-on-rouge-doux focus-visible:outline-creme"
          >
            Répartir équitablement
          </button>
        </div>
      )}
    </fieldset>
  )
}
