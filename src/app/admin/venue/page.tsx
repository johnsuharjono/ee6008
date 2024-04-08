import { AddProjectVenueSheet } from '@/src/components/admin/venue/add-project-venue-sheet'
import { columns } from '@/src/components/admin/venue/project-venue-table/columns'
import { DataTable } from '@/src/components/admin/venue/project-venue-table/data-table'
import { Header } from '@/src/components/header'
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
        actions={<AddProjectVenueSheet semestersData={semestersData} />}
      />

      <DataTable columns={columns} data={venueData} />
    </div>
  )
}

export default VenuePage
