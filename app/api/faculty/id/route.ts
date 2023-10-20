import { prisma } from '@/lib/prisma'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const userId = searchParams.get('userId')

	if (!userId)
		return new Response(JSON.stringify({ error: 'Missing userId' }), {
			status: 400,
		})

	const faculty = await prisma.faculty.findUnique({
		where: {
			userId: userId,
		},
	})

	if (faculty) {
		return new Response(JSON.stringify({ facultyId: faculty.id }), {
			status: 200,
		})
	}

	return new Response(JSON.stringify({ error: 'Faculty not found' }), {
		status: 404,
	})
}
