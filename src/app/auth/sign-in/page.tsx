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
      <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col items-center justify-center bg-muted p-10 dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex flex-col items-center gap-4'>
            <div className='flex items-center gap-4'>
              <Icons.logo size={36} className='text-white' />
              <div className='text-3xl text-white'>EE6008</div>
            </div>
            <div className='text-xl tracking-tight text-white'>Project Management System</div>
          </div>
        </div>

        <div className='flex h-full items-center justify-center bg-background lg:p-8'>
          <div className='flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Log in</h1>
              <p className='text-sm text-muted-foreground'>Enter your email and password below to sign in</p>
            </div>
            <Suspense>
              <UserAuthForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
