import Link from 'next/link'
import { Suspense } from 'react'

import ActiveSemesterWrapper from '@/src/components/admin/semester/active-semester-wrapper'
import EditSemesterButton from '@/src/components/admin/semester/edit-semester-button'
import { ProgrammeLeaderTable } from '@/src/components/admin/semester/programme-leader-table'
import { SelectSemesterWrapper } from '@/src/components/admin/semester/select-semester-wrapper'
import { TimelineTable } from '@/src/components/admin/semester/timeline-table'
import { Header } from '@/src/components/header'
import { TypographyH2 } from '@/src/components/typography'
import { Button } from '@/src/components/ui/button'

const Semester = async ({
  searchParams
}: {
  searchParams?: {
    semester: string
  }
}) => {
  return (
    <div className='space-y-4'>
      <Header
        title='Semester Management'
        description='Create or edit semester timeline and programme!'
        actions={
          <Link href='./semester/create'>
            <Button>Create </Button>
          </Link>
        }
      />

      <div className='py-4 space-y-4'>
        {/* Set active semester component */}
        <ActiveSemesterWrapper />

        {/* Semester Details */}
        <TypographyH2>View & Edit Semester Details</TypographyH2>
        <div className='flex justify-between'>
          <SelectSemesterWrapper searchParams={searchParams} />
          <EditSemesterButton semester={searchParams?.semester} />
        </div>

        <Suspense fallback={<h1>Loading...</h1>}>
          {searchParams?.semester ? (
            <>
              <TimelineTable searchParams={searchParams} />
              <ProgrammeLeaderTable searchParams={searchParams} />
            </>
          ) : (
            <h1 className='text-muted-foreground'>Choose from dropdown above or create a new semester</h1>
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default Semester
