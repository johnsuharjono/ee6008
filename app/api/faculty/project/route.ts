import { prisma } from '@/lib/prisma'

import { type NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  const body = await request.json()

  const project = await prisma.project.update({
    where: {
      id: body.projectId
    },
    data: {
      description: body.description,
      programme: body.programme,
      title: body.title
    }
  })

  return new Response(JSON.stringify({ project: project }), {
    status: 200
  })
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()

  const project = await prisma.project.delete({
    where: {
      id: body.projectId
    }
  })

  return new Response(JSON.stringify({ project: project }), {
    status: 200
  })
}
