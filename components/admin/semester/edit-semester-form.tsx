'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { EditSemesterDataFormSchema } from '@/lib/schema'
import { editSemester } from '@/actions/semester'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import DateTimePickerFormInput from '@/components/ui/date-time-picker-form-input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'

export function EditSemesterForm({
  defaultValues,
  semesterName
}: {
  defaultValues?: z.infer<typeof EditSemesterDataFormSchema>
  semesterName: string
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof EditSemesterDataFormSchema>>({
    resolver: zodResolver(EditSemesterDataFormSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(data: z.infer<typeof EditSemesterDataFormSchema>) {
    const result = await editSemester(data)
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      router.push(`/admin/semester?semester=${semesterName}`)
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 my-2'>
        {/* Hidden form field for id */}
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem className='hidden m-0'>
              <Input {...field} type='hidden' />
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='semester-setting'>
            <AccordionTrigger>Semester Setting</AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <FormField
                control={form.control}
                name='minimumGroupSize'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Minimum group size</FormLabel>
                    <FormControl>
                      <Input className='max-w-[250px] ml-1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maximumGroupSize'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Maximum group size</FormLabel>
                    <FormControl>
                      <Input className='max-w-[250px] ml-1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='projectApplicationsLimit'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Project Application Limit</FormLabel>
                    <FormControl>
                      <Input className='max-w-[250px] ml-1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='timeline-setting'>
            <AccordionTrigger>Configure Timeline</AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <FormField
                control={form.control}
                name='facultyProposalSubmission'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Staff Proposal Submission</FormLabel>
                    <DateTimePickerFormInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Period for when faculty member can submit proposals
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='facultyProposalReview'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Proposal Review</FormLabel>
                    <DateTimePickerFormInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Period for when faculty member can submit proposals
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='studentRegistration'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Student Selection</FormLabel>
                    <DateTimePickerFormInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Period for when students can select projects
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='markEntry'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Mark Entry</FormLabel>
                    <DateTimePickerFormInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Period for when staff can mark entry
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='peerReview'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Peer review</FormLabel>
                    <DateTimePickerFormInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      Period for when students can do peer review
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
