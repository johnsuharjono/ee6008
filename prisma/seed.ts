import { hash } from 'bcrypt'

import { faker } from '@faker-js/faker'
import { PrismaClient, ProjectStatus, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

// async function userSeed() {
//   const password: string = await hash('test', 12)

//   // Define an array of user objects with their respective roles
//   const usersData = [
//     {
//       email: 'john0041@e.ntu.edu.sg',
//       name: 'John Nicholas Suharjono',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'admin@ntu.edu.sg',
//       name: 'Alice',
//       role: UserRole.ADMIN
//     },
//     {
//       email: 'faculty@ntu.edu.sg',
//       name: 'Bob',
//       role: UserRole.FACULTY
//     },
//     {
//       email: 'emma@e.ntu.edu.sg',
//       name: 'Emma Watson',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'jason@e.ntu.edu.sg',
//       name: 'Jason Lee',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'sarah@e.ntu.edu.sg',
//       name: 'Sarah Johnson',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'david@e.ntu.edu.sg',
//       name: 'David Brown',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'lisa@e.ntu.edu.sg',
//       name: 'Lisa Smith',
//       role: UserRole.STUDENT
//     },
//     {
//       email: 'charlie@ntu.edu.sg',
//       name: 'Charlie Brown',
//       role: UserRole.FACULTY
//     },
//     {
//       email: 'emily@ntu.edu.sg',
//       name: 'Emily Johnson',
//       role: UserRole.FACULTY
//     },
//     {
//       email: 'michael@ntu.edu.sg',
//       name: 'Michael Smith',
//       role: UserRole.FACULTY
//     },
//     {
//       email: 'olivia@ntu.edu.sg',
//       name: 'Olivia Williams',
//       role: UserRole.FACULTY
//     },
//     {
//       email: 'ethan@ntu.edu.sg',
//       name: 'Ethan Davis',
//       role: UserRole.FACULTY
//     }
//   ]

//   // Use Promise.all to create or update all users concurrently
//   const userPromises = usersData.map(async (userData) => {
//     const newUser = await prisma.user.upsert({
//       where: { email: userData.email },
//       update: {},
//       create: {
//         email: userData.email,
//         name: userData.name,
//         password,
//         role: userData.role
//       }
//     })

//     // Check the user's role and create a record in the corresponding table
//     if (userData.role === 'ADMIN') {
//       await prisma.admin.create({
//         data: {
//           User: {
//             connect: { id: newUser.id }
//           }
//         }
//       })
//     } else if (userData.role === 'FACULTY') {
//       await prisma.faculty.create({
//         data: {
//           User: {
//             connect: { id: newUser.id }
//           }
//         }
//       })
//     } else if (userData.role === 'STUDENT') {
//       await prisma.student.create({
//         data: {
//           User: {
//             connect: { id: newUser.id }
//           }
//         }
//       })
//     }

//     return newUser
//   })
//   await Promise.all(userPromises)
// }

// async function projectSeed() {
//   // Define an array of user objects with their respective roles
//   const semesterData = await prisma.semester.findFirst({
//     where: {
//       active: true
//     }
//   })

//   if (!semesterData) {
//     console.error('No active semester found')
//     return null
//   }

//   const activeSemesterId = semesterData.id

//   // Get faculty users id
//   const facultyUsers = await prisma.user.findMany({
//     where: {
//       role: UserRole.FACULTY
//     },

//     select: {
//       Faculty: {
//         select: {
//           id: true
//         }
//       }
//     }
//   })

//   const facultyUsersId = facultyUsers.map((user) => user.Faculty?.id)

//   // get all existing programme id for the active semester
//   const programmes = await prisma.programme.findMany({
//     where: {
//       semesterId: activeSemesterId
//     },
//     select: {
//       id: true,
//       programmeCode: true
//     }
//   })

//   if (!programmes) {
//     return null
//   }

//   const venueData = await prisma.venue.findMany({
//     where: {
//       semesterId: activeSemesterId
//     },
//     select: {
//       id: true
//     }
//   })

//   const venueDataId = venueData.filter((venue) => venue.id)

//   const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

//   const generateRandomProjectData = (
//     facultyUsers: (string | undefined)[],
//     programmes: { id: string; programmeCode: string }[]
//   ) => {
//     // Generate random indices within the bounds of the arrays
//     const randomFacultyIndex = getRandomNumber(0, facultyUsers.length - 1)
//     const randomProgrammeIndex = getRandomNumber(0, programmes.length - 1)
//     const randomVenueIndex = getRandomNumber(0, venueDataId.length - 1)

//     // Select random faculty and programme using the generated indices
//     const randomFaculty = facultyUsersId[randomFacultyIndex] as string
//     const randomProgramme = programmes[randomProgrammeIndex]
//     const randomVenue = venueDataId[randomVenueIndex]

//     return {
//       title: faker.person.jobTitle(),
//       description: faker.lorem.paragraph(7),
//       programmeId: randomProgramme.id,
//       programmeCode: randomProgramme.programmeCode,
//       venueId: randomVenue.id,
//       semesterId: activeSemesterId,
//       semesterName: semesterData.name,
//       facultyId: randomFaculty
//     }
//   }

//   // generate projects data
//   const projectData = []
//   for (let i = 0; i < 40; i++) {
//     projectData.push(generateRandomProjectData(facultyUsersId, programmes))
//   }

//   // Use Promise.all to create or update all users concurrently
//   const projectPromises = projectData.map((data) => {
//     return async () => {
//       const { description, programmeId, semesterId, title, venueId, semesterName, programmeCode, facultyId } = data
//       const projectsUnderThisProgram = await prisma.project.findMany({
//         where: {
//           programmeId
//         },
//         orderBy: {
//           createdAt: 'desc'
//         }
//       })

//       const latestProjectCode = projectsUnderThisProgram[0]?.projectCode?.slice(1, 4)
//       const nextId = latestProjectCode === undefined ? '000' : Number(latestProjectCode) + 1
//       const projectCode = `${programmeCode}${nextId.toString().padStart(3, '0')}-${semesterName.slice(
//         0,
//         2
//       )}${semesterName.slice(-1)}`

//       await prisma.project.create({
//         data: {
//           title,
//           description,
//           status: ProjectStatus.APPROVED,
//           projectCode,
//           venueId,
//           facultyId,
//           programmeId
//         }
//       })
//     }
//   })

//   for (const promiseFunction of projectPromises) {
//     await promiseFunction()
//   }
// }

async function projectRegistrationSeed() {
  const students = await prisma.student.findMany({
    select: {
      id: true
    }
  })

  const projects = await prisma.project.findMany({
    select: {
      id: true
    },
    where: {
      programme: {
        semester: {
          active: true
        }
      }
    }
  })

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  let projectRegistrationsData: {
    studentId: string
    projectId: string
    priority: number
  }[] = []

  for (let i = 0; i < students.length; i++) {
    const student = students[i]
    const studentProjects = []
    const numberOfProjects = getRandomNumber(3, 5)
    const set = new Set()
    for (let j = 0; j < numberOfProjects; j++) {
      let randomProjectIndex = getRandomNumber(0, projects.length - 1)
      if (set.has(randomProjectIndex)) {
        randomProjectIndex = getRandomNumber(0, projects.length - 1)
      }
      set.add(randomProjectIndex)
      const randomProject = projects[randomProjectIndex]
      studentProjects.push({
        studentId: student.id,
        projectId: randomProject.id,
        priority: j + 1
      })
    }
    projectRegistrationsData = [...projectRegistrationsData, ...studentProjects]
  }

  await prisma.registration.createMany({
    data: projectRegistrationsData,
    skipDuplicates: true
  })
}

// async function createStudentUsersSeed() {
//   const password: string = await hash('test', 12)

//   // use faker.js
//   const studentsData = Array.from({ length: 100 }, () => ({
//     email: faker.internet.email(),
//     name: faker.person.fullName()
//   }))

//   const promiseArray = studentsData.map(async (student) => {
//     await prisma.student.create({
//       data: {
//         User: {
//           create: {
//             email: student.email,
//             name: student.name,
//             password,
//             role: UserRole.STUDENT
//           }
//         }
//       }
//     })
//   })

//   await Promise.all(promiseArray)
// }

projectRegistrationSeed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
