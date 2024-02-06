import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// Define an array of user objects with their respective roles
	const semesterData = await prisma.semester.findFirst({
		where: {
			active: true,
		},
	})

	if (!semesterData) {
		console.error('No active semester found')
		return null
	}

	const activeSemesterId = semesterData.id

	// Get faculty users id
	const facultyUsers = await prisma.user.findMany({
		where: {
			role: UserRole.FACULTY,
		},

		select: {
			id: true,
		},
	})

	// get all existing programme id for the active semester
	const programmes = await prisma.programme.findMany({
		where: {
			semesterId: activeSemesterId,
		},
		select: {
			id: true,
		},
	})

	if (!programmes) {
		return null
	}

	const getRandomNumber = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1)) + min

	const generateRandomProjectData = (facultyUsers: any, programmes: any) => {
		const randomFacultyIndex = getRandomNumber(0, facultyUsers.length - 1)
		const randomProgrammeIndex = getRandomNumber(0, programmes.length - 1)
		const randomFaculty = facultyUsers[randomFacultyIndex]
		const randomProgramme = programmes[randomProgrammeIndex]
		return {
			title: `Project ${getRandomNumber(1, 100)}`,
			description: `This is a dummy project for ${randomProgramme.name}`,
			Programme: {
				connect: {
					id: randomProgramme.id,
				},
			},
			Faculty: {
				connect: {
					id: randomFaculty.id,
				},
			},
			numberOfStudents: getRandomNumber(1, 5),
		}
	}

	// Create an array of project data
	const projectData = Array.from({ length: 20 }, () =>
		generateRandomProjectData(facultyUsers, programmes)
	)

	console.log(projectData)

	return

	// Use Promise.all to create or update all users concurrently
	const projectPromises = projectData.map(async (data) => {
		await prisma.project.create({
			data,
		})
	})
	await Promise.all(projectPromises)
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
