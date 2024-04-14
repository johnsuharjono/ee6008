import { TypographyH2 } from '@/src/components/typography'
import { prisma } from '@/src/lib/prisma'

import { SelectActiveSemester } from './select-active-semester'

const ActiveSemesterWrapper = async () => {
  const allSemesters = await prisma.semester.findMany()
  const activeSemesters = allSemesters.filter((semester) => semester.active)

  return (
    <div className='space-y-2'>
      <TypographyH2>Active semester Setting</TypographyH2>
      <div className='space-y-2'>
        <p>Current active semesters: {activeSemesters.map((semester) => semester.name).join(', ') || '-'}</p>
        <SelectActiveSemester
          options={allSemesters.map((semester) => ({
            semesterId: semester.id,
            semesterName: semester.name
          }))}
          {...(activeSemesters.length > 0 ? { defaultValue: activeSemesters[0].id } : {})}
        />
      </div>
    </div>
  )
}

export default ActiveSemesterWrapper
