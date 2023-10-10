'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const [errorMessage, setErrorMessage] = React.useState('')

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		try {
			const formData = new FormData(event.currentTarget)
			const res = await signIn('credentials', {
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				redirect: false,
			})
			if (!res?.error) {
				router.push(callbackUrl)
			} else {
				setErrorMessage('Invalid email or password')
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-4'>
					<div className='grid gap-3'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							name='email'
							placeholder='example@e.ntu.edu.sg'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
						/>
						<Label className='sr-only' htmlFor='email'>
							Password
						</Label>
						<Input
							name='password'
							id='password'
							placeholder='password'
							type='password'
							autoCorrect='off'
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Sign In
					</Button>
					{!!errorMessage.length && (
						<Alert variant='destructive'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					)}
				</div>
			</form>
		</div>
	)
}
