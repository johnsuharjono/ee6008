import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ProjectStatus } from '@prisma/client'

interface ProjectMemberCard {
  project: {
    id: string
    projectCode: string
    title: string
    status: ProjectStatus
    students: {
      name: string
      email: string
      matriculationNumber: string
    }[]
  }
}

export function ProjectMemberCard({ project }: ProjectMemberCard) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md'>{project.title}</CardTitle>
        <CardDescription># {project.projectCode}</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        {project.students.length === 0 && <p className='text-sm font-medium leading-none'>No students assigned</p>}
        {project.students.map((student) => (
          <div key={student.matriculationNumber} className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/avatars/01.png' />
                <AvatarFallback>
                  {student.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium leading-none'>{student.name}</p>
                <p className='text-sm text-muted-foreground'>{student.email}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
