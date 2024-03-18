'use client'

import { AlertCircle, CircuitBoard } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { Icons } from '@/src/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

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
        redirect: false
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
    <div className='flex min-h-screen items-center justify-center' {...props}>
      <form onSubmit={onSubmit}>
        <Card className='w-[400px] max-w-[90vw]'>
          <CardHeader>
            <CardTitle className='flex items-center gap-1 text-xl'>
              <CircuitBoard size={20} />
              <span>EE6008</span>
            </CardTitle>
            <CardDescription>Enter your credentials below</CardDescription>
          </CardHeader>
          <CardContent className={cn('grid gap-6', className)}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='example@e.ntu.edu.sg'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isLoading}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Password</Label>
                <Input
                  name='password'
                  id='password'
                  placeholder='password'
                  type='password'
                  autoCorrect='off'
                  disabled={isLoading}
                />
              </div>
              {!!errorMessage.length && (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full' disabled={isLoading}>
              {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
