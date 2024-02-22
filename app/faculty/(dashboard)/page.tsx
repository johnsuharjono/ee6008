import { SemesterTimeline } from '@/components/common/semester-timeline'
import DashboardCard from '@/components/faculty/dashboard-card'
import { TypographyH1 } from '@/components/typography'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FolderKanban, MonitorDot } from 'lucide-react'
import { getServerSession } from 'next-auth'

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
        <DashboardCard
          title='Current semester'
          description={activeSemester?.name}
          Icon={MonitorDot}
        />
        <DashboardCard
          title='Projects proposed'
          description={projects.length.toString()}
          Icon={FolderKanban}
        />
      </div>

      <SemesterTimeline />
    </div>
  )
}

export default FacultyPage
