import { prisma } from '@/lib/prisma'
import { Prisma, UserRole } from '@prisma/client'
import { hash } from 'bcrypt'

import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const body = await request.json()
	const password = await hash(body.password, 12)

	const role = body.role
	let user

	try {
		if (role === 'FACULTY') {
			user = await prisma.user.create({
				data: {
					name: body.name,
					email: body.email,
					password,
					role: UserRole.FACULTY,
					Faculty: {
						create: {},
					},
				},
			})
		} else if (role === 'STUDENT') {
			user = await prisma.user.create({
				data: {
					name: body.name,
					email: body.email,
					password,
					role: UserRole.STUDENT,
					Student: {
						create: {},
					},
				},
			})
		} else if (role === 'ADMIN') {
			user = await prisma.user.create({
				data: {
					name: body.name,
					email: body.email,
					password,
					role: UserRole.ADMIN,
					Admin: {
						create: {},
					},
				},
			})
		}
		return new Response(JSON.stringify({ user }), {
			status: 200,
		})
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (e.code === 'P2002') {
				return new Response(
					JSON.stringify({
						message:
							'There is a unique constraint violation, a new user cannot be created with this email',
					}),
					{
						status: 409,
					}
				)
			}
		}
		return new Response(JSON.stringify({ e }), {
			status: 400,
		})
	}
}

export async function PUT(request: NextRequest) {
	const body = await request.json()
	const password = await hash(body.password, 12)

	const role = body.role
	let user

	if (role === 'FACULTY') {
		user = await prisma.user.update({
			where: {
				id: body.id,
			},
			data: {
				name: body.name,
				email: body.email,
				password,
			},
		})
	} else if (role === 'STUDENT') {
		user = await prisma.user.update({
			where: {
				id: body.id,
			},
			data: {
				name: body.name,
				email: body.email,
				password,
			},
		})
	} else if (role === 'ADMIN') {
		user = await prisma.user.update({
			where: {
				id: body.id,
			},
			data: {
				name: body.name,
				email: body.email,
				password,
			},
		})
	} else {
		// Throw an error if the role is invalid
		return new Response(JSON.stringify({ error: 'Invalid user data' }), {
			status: 400,
		})
	}

	return new Response(JSON.stringify({ user }), {
		status: 200,
	})
}

export async function DELETE(request: NextRequest) {
	const body = await request.json()

	const user = await prisma.user.delete({
		where: {
			id: body.id,
		},
	})

	return new Response(JSON.stringify({ user }), {
		status: 200,
	})
}
