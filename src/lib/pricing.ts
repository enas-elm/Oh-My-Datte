export type PriceTier = {
  min: number
  max: number
  price: number
}

export const MAX_QUANTITY = 500

export const priceTiers: PriceTier[] = [
  { min: 1, max: 29, price: 6.5 },
  { min: 30, max: 49, price: 5.9 },
  { min: 50, max: 99, price: 5.5 },
  { min: 100, max: MAX_QUANTITY, price: 5.3 },
]

export function getUnitPrice(qty: number): number {
  const tier = [...priceTiers].reverse().find((t) => qty >= t.min)
  return (tier ?? priceTiers[0]).price
}

export function getTotalPrice(qty: number): number {
  return Math.round(getUnitPrice(qty) * qty * 100) / 100
}

const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

/** « 5,90 € », avec l'espace insécable avant l'euro. */
export function formatPrice(value: number): string {
  return euros.format(value)
}
