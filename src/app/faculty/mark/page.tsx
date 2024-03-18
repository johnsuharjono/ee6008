import _ from 'lodash'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Header } from '@/src/components/header'
import { TypographyP } from '@/src/components/typography'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const MarkPage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  const projects = await prisma.project.findMany({
    where: {
      facultyId: user.facultyId
    }
  })

  return (
    <div className='space-y-4'>
      <Header title='Marking' description='Grade your student here.' />

      <div>
        <TypographyP>Select project to grade:</TypographyP>
        <ol className='my-4 ml-6 list-decimal [&>li]:mt-2'>
          {projects.map((project) => (
            <li key={project.id}>
              <Link className='underline-offset-4 hover:underline' href={`/faculty/mark/${project.id}`}>
                {project.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default MarkPage
