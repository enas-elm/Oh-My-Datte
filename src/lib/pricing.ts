export type PriceTier = {
  min: number
  max: number
  price: number
}

export const priceTiers: PriceTier[] = [
  { min: 1, max: 29, price: 6.50 },
  { min: 30, max: 49, price: 5.90 },
  { min: 50, max: 99, price: 5.50 },
  { min: 100, max: 500, price: 5.30 },
]

export function getUnitPrice(qty: number): number {
  if (qty >= 100) return 5.30
  if (qty >= 50) return 5.50
  if (qty >= 30) return 5.90
  return 6.50
}

export function getTotalPrice(qty: number): number {
  return Math.round(getUnitPrice(qty) * qty * 100) / 100
}
