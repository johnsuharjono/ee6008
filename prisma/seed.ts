import { PrismaClient, UserRole } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
	const password: string = await hash('test', 12)

	// Define an array of user objects with their respective roles
	const usersData = [
		{
			email: 'john0041@e.ntu.edu.sg',
			name: 'John Nicholas Suharjono',
			role: UserRole.STUDENT,
		},
		{
			email: 'admin@example.com',
			name: 'Alice',
			role: UserRole.ADMIN,
		},
		{
			email: 'faculty@example.com',
			name: 'Bob',
			role: UserRole.FACULTY,
		},
	]

	// Use Promise.all to create or update all users concurrently
	const userPromises = usersData.map(async (userData) => {
		const newUser = await prisma.user.upsert({
			where: { email: userData.email },
			update: {},
			create: {
				email: userData.email,
				name: userData.name,
				password,
				role: userData.role,
			},
		})

		// Check the user's role and create a record in the corresponding table
		if (userData.role === 'ADMIN') {
			await prisma.admin.create({
				data: {
					user: {
						connect: { id: newUser.id },
					},
					// Add any other admin-specific data here
				},
			})
		} else if (userData.role === 'FACULTY') {
			await prisma.faculty.create({
				data: {
					user: {
						connect: { id: newUser.id },
					},
					// Add any other faculty-specific data here
				},
			})
		} else if (userData.role === 'STUDENT') {
			await prisma.student.create({
				data: {
					user: {
						connect: { id: newUser.id },
					},
					// Add any other student-specific data here
				},
			})
		}

		return newUser
	})

	const users = await Promise.all(userPromises)
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
