import { getServerSession } from 'next-auth'

import { columns } from '@/src/components/student/projects/columns'
import { DataTable } from '@/src/components/student/projects/data-table'
import { authOptions } from '@/src/lib/auth'
import { getAvailableProjects } from '@/src/server/student'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const projects = await getAvailableProjects()
  const programmeFilterOptions = Array.from(new Set(projects.map((project) => project.programme))).map((programme) => ({
    label: programme,
    value: programme
  }))

  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
      <div className='flex-col gap-4'>
        <h1 className='text-3xl font-semibold'>Welcome back, {session?.user.name}!</h1>
        <h3 className='text-lg tracking-tight text-muted-foreground'>Here are the list of projects available:</h3>
        <DataTable columns={columns} data={projects} programmeFilterOptions={programmeFilterOptions} />
      </div>
    </section>
  )
}
