'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { addFaculty } from '@/src/app/actions/admin/user'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/src/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { useMediaQuery } from '@/src/hooks/use-media-query'
import { AddFacultyFormSchema } from '@/src/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddFacultyModalProps {
  isModalOpen: boolean
  setModalOpen: (bool: boolean) => void
}

export const AddFacultyModal = ({ isModalOpen, setModalOpen }: AddFacultyModalProps) => {
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const form = useForm({
    resolver: zodResolver(AddFacultyFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof AddFacultyFormSchema>) => {
    const result = await addFaculty(values)
    if (result.status === 'ERROR') {
      setModalOpen(false)
      toast.error(result.message)
    } else {
      form.reset()
      setModalOpen(false)
      toast.success(result.message)
      router.refresh()
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={() => setModalOpen(!isModalOpen)}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Create a faculty user</DialogTitle>
            <DialogDescription className='text-center text-lg'>
              Enter your email below to create your account
            </DialogDescription>
          </DialogHeader>
          <FacultyForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isModalOpen} onOpenChange={setModalOpen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle className='text-xl'>Create a faculty user</DrawerTitle>
          <DrawerDescription> Enter the credentials below to create an account.</DrawerDescription>
        </DrawerHeader>
        <div className='px-4'>
          <FacultyForm />
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  function FacultyForm() {
    return (
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

          <Button className='w-full' disabled={isLoading}>
            Create user
          </Button>
        </form>
      </Form>
    )
  }
}
