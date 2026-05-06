import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Links go.golegit.cl/* fueron migrados a app.golegit.cl/r/*
// Este handler redirige permanentemente para preservar links ya enviados a usuarios.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  if (!code || code.length > 20) {
    return NextResponse.redirect('https://golegit.cl', { status: 302 })
  }

  return NextResponse.redirect(`https://app.golegit.cl/r/${code}`, { status: 301 })
}
