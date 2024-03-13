import _ from 'lodash'
import { getServerSession } from 'next-auth'

import { ProjectMemberCard } from '@/src/components/faculty/project-member-card'
import { Header } from '@/src/components/header'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const MarkPage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  return (
    <div className='space-y-4'>
      <Header title='Marking' description='Grade your student here.' />
    </div>
  )
}

export default MarkPage
