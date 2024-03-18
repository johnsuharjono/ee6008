import { Suspense } from 'react'

import { prisma } from '@/src/lib/prisma'

import { SelectSemester } from './select-semester'

export const SelectSemesterWrapper = async ({
  searchParams
}: {
  searchParams?: {
    semester: string
  }
}) => {
  const allSemester = await prisma.semester.findMany()

  const selectedSemesterRow = allSemester.find((row) => row.name === searchParams?.semester)

  if (selectedSemesterRow) {
    return (
      <Suspense>
        <SelectSemester
          key={searchParams?.semester}
          options={allSemester.map((row) => row.name)}
          defaultValue={selectedSemesterRow.name}
        />
      </Suspense>
    )
  }

  return <SelectSemester options={allSemester.map((row) => row.name)} />
}
