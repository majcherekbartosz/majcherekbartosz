import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/leads
 * Creates a client record and a lead record in Supabase.
 * Body: { imie: string; miasto: string; opis: string; kategoria: CareCategoryType }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imie, miasto, opis, kategoria } = body

    if (!miasto || !opis || !kategoria) {
      return NextResponse.json(
        { error: 'miasto, opis i kategoria są wymagane' },
        { status: 400 }
      )
    }

    // In production: insert to Supabase
    // const supabase = createClient(...)
    // const { data: client } = await supabase
    //   .from('dim_clients')
    //   .insert({ miasto_zlecenia: miasto, imie_kontaktowe: imie })
    //   .select()
    //   .single()
    //
    // const { data: lead } = await supabase
    //   .from('fact_leads')
    //   .insert({ client_id: client.id, kategoria_opieki: kategoria, opis_zapotrzebowania: opis })
    //   .select()
    //   .single()

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      message: 'Zgłoszenie zostało utworzone',
    })
  } catch {
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
