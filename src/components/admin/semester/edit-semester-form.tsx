'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { editSemester } from '@/src/app/actions/admin/semester'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion'
import { Button } from '@/src/components/ui/button'
import DateTimePickerFormInput from '@/src/components/ui/date-time-picker-form-input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { EditSemesterDataFormSchema } from '@/src/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-2 space-y-8'>
        {/* Hidden form field for id */}
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem className='m-0 hidden'>
              <Input {...field} type='hidden' />
              <FormMessage />
            </FormItem>
          )}
        />

        <Tabs defaultValue='semester-setting'>
          <TabsList>
            <TabsTrigger value='semester-setting'>Semester Setting</TabsTrigger>
            <TabsTrigger value='timeline-setting'>Configure Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value='semester-setting' className='max-w-2xl space-y-6'>
            <FormField
              control={form.control}
              name='minimumGroupSize'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Minimum group size</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter minimum group size' {...field} />
                  </FormControl>
                  <FormDescription>The minimum number of students to form a group</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maximumGroupSize'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Maximum group size</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter maximum group size' {...field} />
                  </FormControl>
                  <FormDescription>The maximum number of students to form a group</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='projectApplicationsLimit'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel>Project Application Limit</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter student registration limit' {...field} />
                  </FormControl>
                  <FormDescription>Number of projects student can register</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value='timeline-setting' className='max-w-2xl space-y-6'>
            <FormField
              control={form.control}
              name='facultyProposalSubmission'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-4'>
                  <FormLabel>Staff Proposal Submission</FormLabel>
                  <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                  <FormDescription>Period for when faculty member can submit proposals</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='facultyProposalReview'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-4'>
                  <FormLabel>Proposal Review</FormLabel>
                  <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                  <FormDescription>Period for when faculty member can submit proposals</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='studentRegistration'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-4'>
                  <FormLabel>Student Selection</FormLabel>
                  <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                  <FormDescription>Period for when students can select projects</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='markEntry'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-4'>
                  <FormLabel>Mark Entry</FormLabel>
                  <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                  <FormDescription>Period for when staff can mark entry</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='peerReview'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-4'>
                  <FormLabel>Peer review</FormLabel>
                  <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                  <FormDescription>Period for when students can do peer review</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
