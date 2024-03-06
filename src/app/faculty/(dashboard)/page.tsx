import { FolderKanban, MonitorDot } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { SemesterTimeline } from '@/src/components/common/semester-timeline'
import DashboardCard from '@/src/components/faculty/dashboard-card'
import { TypographyH1 } from '@/src/components/typography'
import { Separator } from '@/src/components/ui/separator'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const FacultyPage = async () => {
  const user = await getServerSession(authOptions)
  const name = user?.user.name
  const activeSemester = await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      id: true,
      name: true
    }
  })

  const projects = await prisma.project.findMany({
    where: {
      Programme: {
        semesterId: activeSemester?.id
      },
      facultyId: user?.user.facultyId
    }
  })

  return (
    <div className='space-y-4'>
      <TypographyH1>Welcome back, {name}!</TypographyH1>

      <Separator />

      <div className='grid md:grid-cols-2 gap-4 max-w-lg'>
        <DashboardCard title='Current semester' description={activeSemester?.name} Icon={MonitorDot} />
        <DashboardCard title='Projects proposed' description={projects.length.toString()} Icon={FolderKanban} />
      </div>

      <SemesterTimeline />
    </div>
  )
}

export default FacultyPage
