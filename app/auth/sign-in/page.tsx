import { Metadata } from 'next'
import { UserAuthForm } from '@/components/form/user-auth-form'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'EE6008 Authentication Page.',
}

export default function SignInPage() {
	return (
		<>
			<div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex items-center justify-center'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='flex flex-col gap-4 relative z-20 items-center'>
						<div className='flex items-center gap-4'>
							<Icons.logo size={36} className='text-white' />
							<div className='text-3xl text-white'>EE6008</div>
						</div>
						<div className='text-xl tracking-tight text-white'>
							Project Management System
						</div>
					</div>
				</div>

				<div className='lg:p-8 h-full bg-background flex justify-center items-center'>
					<div className='flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>Log in</h1>
							<p className='text-sm text-muted-foreground'>
								Enter your email and password below to sign in
							</p>
						</div>
						<UserAuthForm />
					</div>
				</div>
			</div>
		</>
	)
}
