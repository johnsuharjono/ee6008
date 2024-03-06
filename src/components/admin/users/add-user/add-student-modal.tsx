'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { addStudent } from '@/src/app/actions/admin/user'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { AddStudentFormSchema } from '@/src/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddStudentModalProps {
  isModalOpen: boolean
  setModalOpen: (bool: boolean) => void
}

export const AddStudentModal = ({ isModalOpen, setModalOpen }: AddStudentModalProps) => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(AddStudentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      matriculationNumber: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof AddStudentFormSchema>) => {
    const result = await addStudent(values)
    if (result.status === 'ERROR') {
      setModalOpen(false)
      toast.error(result.message)
    } else {
      setModalOpen(false)
      toast.success(result.message)
      router.refresh()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => setModalOpen(!isModalOpen)}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center'>Create a student user</DialogTitle>
          <DialogDescription className='text-lg text-center'>
            Enter your email below to create your account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='matriculationNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matriculation Number</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button className='w-full' disabled={isLoading}>
                Create user
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
