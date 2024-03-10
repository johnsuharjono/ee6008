'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { rejectProject } from '@/src/app/actions/faculty/review'
import { Button } from '@/src/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Textarea } from '../ui/textarea'

interface RejectProposalModalProps {
  projectId: string
  setModalOpen: (bool: boolean) => void
}

const RejectProposalFormSchema = z.object({
  message: z.string().max(1000).min(1, {
    message: 'Rejection message is required.'
  })
})

export const RejectProposalModal = ({ projectId, setModalOpen }: RejectProposalModalProps) => {
  const form = useForm({
    resolver: zodResolver(RejectProposalFormSchema),
    defaultValues: {
      message: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof RejectProposalFormSchema>) => {
    const result = await rejectProject(projectId, values.message)
    if (result.status === 'ERROR') {
      setModalOpen(false)
      toast.error(result.message)
    } else {
      setModalOpen(false)
      toast.success(result.message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='md:text-2xl'>Reject project</DialogTitle>
        <DialogDescription>Enter your reason for rejecting the project</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea className='h-[250px] resize-none' {...field} />
                </FormControl>
                <FormDescription>Max 1000 characters are allowed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button className='w-full' disabled={isLoading}>
              Reject proposal
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
