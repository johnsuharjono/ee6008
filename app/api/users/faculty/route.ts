import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'

import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const password = await hash(body.password, 12)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password,
      role: 'FACULTY',
      Faculty: {
        create: {}
      }
    }
  })

  return new Response(JSON.stringify({ user }), {
    status: 200
  })
}

export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}
