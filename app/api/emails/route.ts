import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  // Save to Supabase
  const { error } = await supabase
    .from('emails')
    .insert([{ email }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Send to Formspree
  await fetch('https://formspree.io/f/xpwjvdpb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })

  return NextResponse.json({ success: true })
}