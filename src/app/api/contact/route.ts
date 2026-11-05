import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getTotalPrice, MAX_QUANTITY } from "@/lib/pricing"
import { validerComposition } from "@/lib/composition"

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith("eyJ")) {
    return NextResponse.json({ error: "SERVICE_ROLE_KEY missing or invalid" }, { status: 500 })
  }

  const { name, email, message, quantity, composition } = await req.json()

  const quantityNumber = typeof quantity === "number" ? quantity : Number(quantity)
  const safeQuantity =
    Number.isFinite(quantityNumber) && quantityNumber > 0
      ? Math.min(MAX_QUANTITY, Math.floor(quantityNumber))
      : null
  const totalPrice = safeQuantity ? getTotalPrice(safeQuantity) : null

  // Composition : recalculée si équilibrée, vérifiée si sur mesure
  let compositionValue = null
  if (safeQuantity) {
    const result = validerComposition(composition, safeQuantity)
    if (!result.ok) {
      return NextResponse.json({ error: result.erreur }, { status: 400 })
    }
    compositionValue = result.composition
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )

  const { error } = await supabase.from("messages").insert([
    {
      name: name ?? null,
      email,
      message,
      quantity: safeQuantity,
      total_price: totalPrice,
      composition: compositionValue,
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
