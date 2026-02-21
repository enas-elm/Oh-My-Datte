import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // <- MUST be service role
    { auth: { persistSession: false } }
  )

  const { error } = await supabase
    .from("messages")
    .insert([{ name: name ?? null, email, message }])

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith("eyJ")) {
    return NextResponse.json({ error: "SERVICE_ROLE_KEY missing or invalid" }, { status: 500 })
  }


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }


  return NextResponse.json({ ok: true })
}
