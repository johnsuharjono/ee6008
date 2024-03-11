import { create } from 'lodash'

import { prisma } from '@/src/lib/prisma'

export const getProjectVenue = async (semesterId?: string) => {
  if (!semesterId) {
    const response = await prisma.venue.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        semester: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const sanitizedResponse = response.map((venue) => {
      return {
        id: venue.id,
        name: venue.name,
        location: venue.location,
        semesterId: venue.semester.id,
        semesterName: venue.semester.name,
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt
      }
    })

    return sanitizedResponse
  } else {
    const response = await prisma.venue.findMany({
      where: {
        semesterId
      },
      select: {
        id: true,
        name: true,
        location: true,
        semester: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const sanitizedResponse = response.map((venue) => {
      return {
        id: venue.id,
        name: venue.name,
        location: venue.location,
        semesterId: venue.semester.id,
        semesterName: venue.semester.name,
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt
      }
    })

    return sanitizedResponse
  }
}
