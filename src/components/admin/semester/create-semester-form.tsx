'use client'

import { Check, ChevronsUpDown, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createSemester } from '@/src/app/actions/admin/semester'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion'
import { Button } from '@/src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/src/components/ui/command'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { AddSemesterDataFormSchema } from '@/src/lib/schema'
import { cn } from '@/src/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

interface CreateSemesterFormProps {
  faculties: ({
    user: {
      id: string
      name: string
    }
  } & {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
  })[]
}

export function CreateSemesterForm({ faculties }: CreateSemesterFormProps) {
  const defaultValues: Partial<z.infer<typeof AddSemesterDataFormSchema>> = {
    programmeDetails: [
      {
        faculty: '',
        programmeName: 'Communications Engineering',
        programCode: '1'
      },
      {
        faculty: '',
        programmeName: 'Computer Control & Automation',
        programCode: '2'
      },
      {
        faculty: '',
        programmeName: 'Electronics',
        programCode: '3'
      },
      {
        faculty: '',
        programmeName: 'Power Engineering',
        programCode: '4'
      },
      {
        faculty: '',
        programmeName: 'Signal Processing',
        programCode: '5'
      }
    ]
  }

  const router = useRouter()
  const form = useForm<z.infer<typeof AddSemesterDataFormSchema>>({
    resolver: zodResolver(AddSemesterDataFormSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(data: z.infer<typeof AddSemesterDataFormSchema>) {
    const result = await createSemester(data)
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      router.push(`/admin/semester?semester=${data.semesterName}`)
      router.refresh()
    }
  }

  const { fields, append, remove } = useFieldArray({
    name: 'programmeDetails',
    control: form.control
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='semester-setting'>
            <AccordionTrigger>Semester Setting</AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <FormField
                control={form.control}
                name='semesterName'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Semester name</FormLabel>
                    <FormControl>
                      <Input placeholder='Input semester name' className='max-w-[250px] ml-1' {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be in format of XXSY where X is start year and Y is semester.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  <FormItem className='flex flex-col'>
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
                  <FormItem className='flex flex-col'>
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
                  <FormItem className='flex flex-col'>
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
                  <FormItem className='flex flex-col'>
                    <FormLabel>Peer review</FormLabel>
                    <DateTimePickerFormInput value={field.value} onChange={field.onChange} />
                    <FormDescription>Period for when students can do peer review</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='programme-leader'>
            <AccordionTrigger>Programme Director (Delegate)</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                {fields.map((field, index) => (
                  <div className='grid md:grid-cols-12 gap-x-4 px-1' key={field.id}>
                    <FormField
                      control={form.control}
                      name={`programmeDetails.${index}.faculty`}
                      render={({ field }) => (
                        <FormItem className='md:col-span-4'>
                          <FormLabel className={cn(index !== 0 && 'sr-only')}>Faculty</FormLabel>
                          <div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      !field.value && 'text-muted-foreground',
                                      'w-full flex justify-between items-center'
                                    )}
                                  >
                                    {field.value
                                      ? faculties.find((faculty) => faculty.id === field.value)?.user.name
                                      : 'Select faculty'}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-[300px] p-0'>
                                <Command>
                                  <CommandInput placeholder='Search faculty...' />
                                  <CommandEmpty>No faculty member found.</CommandEmpty>
                                  <CommandGroup>
                                    {faculties.map((faculty) => (
                                      <CommandItem
                                        value={faculty.user.name}
                                        key={faculty.user.id}
                                        onSelect={() => {
                                          form.setValue(`programmeDetails.${index}.faculty`, faculty.id)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            faculty.user.name === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                        {faculty.user.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`programmeDetails.${index}.programmeName`}
                      render={({ field }) => (
                        <FormItem className='md:col-span-5'>
                          <FormLabel className={cn(index !== 0 && 'sr-only')}>Programme Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`programmeDetails.${index}.programCode`}
                      render={({ field }) => (
                        <FormItem className='md:col-span-2'>
                          <FormLabel className={cn(index !== 0 && 'sr-only')}>Programme Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='md:col-span-1 self-end'>
                      <Button type='button' variant='outline' size='icon' onClick={() => remove(index)}>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className='flex justify-center'>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='my-4'
                    onClick={() => append({ faculty: '', programmeName: '', programCode: '' })}
                  >
                    Add Programme
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
