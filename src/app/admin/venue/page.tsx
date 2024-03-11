import { Upload } from 'lucide-react'

import { AddProjectVenueSheet } from '@/src/components/admin/venue/add-project-venue-sheet'
import { columns } from '@/src/components/admin/venue/project-venue-table.tsx/columns'
import { DataTable } from '@/src/components/admin/venue/project-venue-table.tsx/data-table'
import { UploadVenueDrawer } from '@/src/components/admin/venue/upload-venue-drawer'
import { Header } from '@/src/components/header'
import { prisma } from '@/src/lib/prisma'
import { getActiveSemester, getAllSemesters } from '@/src/server/data/semester'
import { getProjectVenue } from '@/src/server/data/venue'

const VenuePage = async () => {
  const semestersData = await getAllSemesters()
  const activeSemester = await getActiveSemester()

  if (!activeSemester) {
    return <div>There is no active semester</div>
  }

  const venueData = await getProjectVenue()

  return (
    <div className='space-y-4'>
      <Header
        title='Venue Management'
        description='Create or edit venue details!'
        actions={
          <>
            <UploadVenueDrawer semestersData={semestersData} />
            <AddProjectVenueSheet semesterId={activeSemester.id} />
          </>
        }
      />

      <DataTable columns={columns} data={venueData} />
    </div>
  )
}

export default VenuePage
