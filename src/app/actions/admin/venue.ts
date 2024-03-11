'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/src/lib/prisma'

export const handleVenueUpload = async (venueData: { name: string; location: string }[], semesterId: string) => {
  try {
    await prisma.venue.createMany({
      data: venueData.map((venue) => ({
        name: venue.name,
        location: venue.location,
        semesterId
      })),
      skipDuplicates: true
    })
    return { message: 'Venue created successfully', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}

export const editVenue = async (venueData: { id: string; name: string; location: string }) => {
  try {
    await prisma.venue.update({
      where: {
        id: venueData.id
      },
      data: {
        name: venueData.name,
        location: venueData.location
      }
    })
    revalidatePath('/admin/venue')
    return { message: 'Venue updated successfully', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}

export const addVenue = async (venueData: { name: string; location: string; semesterId: string }) => {
  try {
    await prisma.venue.create({
      data: {
        name: venueData.name,
        location: venueData.location,
        semesterId: venueData.semesterId
      }
    })
    revalidatePath('/admin/venue')
    return { message: 'Venue added successfully', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}

export const deleteVenue = async (venueId: string) => {
  try {
    await prisma.venue.delete({
      where: {
        id: venueId
      }
    })
    revalidatePath('/admin/venue')
    return { message: 'Venue deleted successfully', status: 'SUCCESS' }
  } catch (error) {
    console.error(error)
    return { message: `An error occurred: ${error}`, status: 'ERROR' }
  }
}
