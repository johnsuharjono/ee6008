import { Metadata } from 'next'
import { Suspense } from 'react'

import { UserAuthForm } from '@/src/components/form/user-auth-form'
import { Icons } from '@/src/components/icons'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'EE6008 Authentication Page.'
}

export default function SignInPage() {
  return (
    <>
      <Suspense>
        <UserAuthForm />
      </Suspense>
    </>
  )
}
