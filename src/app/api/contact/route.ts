import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getTotalPrice } from "@/lib/pricing"

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith("eyJ")) {
    return NextResponse.json({ error: "SERVICE_ROLE_KEY missing or invalid" }, { status: 500 })
  }

  const { name, email, message, quantity } = await req.json()

  const quantityNumber = typeof quantity === "number" ? quantity : Number(quantity)
  const safeQuantity =
    Number.isFinite(quantityNumber) && quantityNumber > 0
      ? Math.min(500, Math.floor(quantityNumber))
      : null
  const totalPrice = safeQuantity ? getTotalPrice(safeQuantity) : null

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )

  const { error } = await supabase
    .from("messages")
    .insert([{ name: name ?? null, email, message, quantity: safeQuantity, total_price: totalPrice }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }


  return NextResponse.json({ ok: true })
}
