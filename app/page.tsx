import { redirect } from 'next/navigation'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type User = {
  name?: string | null
  email?: string | null
  role?: 'STUDENT' | 'FACULTY' | 'ADMIN'
}

export default async function Home() {
  const session = (await getServerSession({
    ...authOptions
  })) as Session & { user: User }

  const role = session?.user.role

  if (role === 'STUDENT') {
    redirect('/student')
  } else if (role === 'FACULTY') {
    redirect('/faculty')
  } else {
    redirect('/admin')
  }
}
