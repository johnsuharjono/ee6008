import { prisma } from '../lib/prisma'

export const getAvailableProjects = async () => {
  const data = await prisma.project.findMany({
    where: {
      status: 'APPROVED',
      Programme: {
        Semester: {
          active: true
        }
      }
    },
    include: {
      Faculty: {
        include: {
          User: {
            select: {
              name: true
            }
          }
        }
      },
      Programme: {
        select: {
          name: true
        }
      }
    }
  })

  const projects = data.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    programme: project.Programme.name,
    faculty: project.Faculty.User.name
  }))

  return projects
}

export const getStudentProjectPlan = async (studentId: string) => {
  const data = await prisma.projectPlan.findMany({
    where: {
      studentId: studentId
    },
    include: {
      Project: {
        include: {
          Programme: {
            select: {
              name: true
            }
          },
          Faculty: {
            include: {
              User: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const sanitizedData = data.map((plan) => {
    return {
      id: plan.projectId,
      title: plan.Project.title,
      faculty: plan.Project.Faculty.User.name,
      programme: plan.Project.Programme.name
    }
  })

  return sanitizedData
}

export const getStudentProjectRegistration = async (studentId: string) => {
  const data = await prisma.registration.findMany({
    where: {
      studentId
    },
    include: {
      Project: {
        include: {
          Programme: {
            select: {
              name: true
            }
          },
          Faculty: {
            include: {
              User: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const sanitizedData = data.map((project) => {
    return {
      id: project.projectId,
      title: project.Project.title,
      priority: project.priority,
      faculty: project.Project.Faculty.User.name,
      programme: project.Project.Programme.name
    }
  })

  return sanitizedData
}

export const getStudentAllocatedProject = async (studentId: string) => {
  const data = await prisma.student.findUnique({
    where: {
      id: studentId
    },
    select: {
      Project: {
        include: {
          Programme: {
            select: {
              name: true
            }
          },
          Faculty: {
            include: {
              User: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!data) return null

  if (data.Project === null) return null

  const projectMembers = await prisma.student.findMany({
    where: {
      projectId: data.Project.id
    },
    select: {
      User: {
        select: {
          name: true
        }
      }
    }
  })

  const sanitizedData = {
    id: data.Project.id,
    title: data.Project.title,
    faculty: data.Project.Faculty.User.name,
    programme: data.Project.Programme.name,
    description: data.Project.description,
    members: projectMembers.map((member) => member.User.name)
  }

  return sanitizedData
}
