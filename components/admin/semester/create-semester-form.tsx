'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Check, ChevronsUpDown, Trash2 } from 'lucide-react'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import DateTimePickerFormInput from '@/components/ui/date-time-picker-form-input'
import { AddSemesterDataFormSchema } from '@/lib/schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { createSemester } from '@/actions/semester'

interface CreateSemesterFormProps {
  faculties: ({
    User: {
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
    programmeLeaders: [
      {
        faculty: '',
        programmeName: 'Communications Engineering'
      },
      {
        faculty: '',
        programmeName: 'Computer Control & Automation'
      },
      {
        faculty: '',
        programmeName: 'Electronics'
      },
      {
        faculty: '',
        programmeName: 'Power Engineering'
      },
      {
        faculty: '',
        programmeName: 'Signal Processing'
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
    name: 'programmeLeaders',
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
                      <Input
                        placeholder='Input semester name'
                        className='max-w-[250px] ml-1'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be in format of XXSY where X is start year and Y is
                      semester.
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

          <AccordionItem value='programme-leader'>
            <AccordionTrigger>Programme Director (Delegate)</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                {fields.map((field, index) => (
                  <div
                    className='grid md:grid-cols-12 gap-x-4 px-1'
                    key={field.id}
                  >
                    <FormField
                      control={form.control}
                      name={`programmeLeaders.${index}.faculty`}
                      render={({ field }) => (
                        <FormItem className='md:col-span-5'>
                          <FormLabel className={cn(index !== 0 && 'sr-only')}>
                            Faculty
                          </FormLabel>
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
                                      ? faculties.find(
                                          (faculty) =>
                                            faculty.id === field.value
                                        )?.User.name
                                      : 'Select faculty'}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-[300px] p-0'>
                                <Command>
                                  <CommandInput placeholder='Search faculty...' />
                                  <CommandEmpty>
                                    No faculty member found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {faculties.map((faculty) => (
                                      <CommandItem
                                        value={faculty.User.name}
                                        key={faculty.User.id}
                                        onSelect={() => {
                                          form.setValue(
                                            `programmeLeaders.${index}.faculty`,
                                            faculty.id
                                          )
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            faculty.User.name === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {faculty.User.name}
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
                      name={`programmeLeaders.${index}.programmeName`}
                      render={({ field }) => (
                        <FormItem className='md:col-span-5'>
                          <FormLabel className={cn(index !== 0 && 'sr-only')}>
                            Programme Name
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='md:col-span-2 self-end'>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => remove(index)}
                      >
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
                    onClick={() => append({ faculty: '', programmeName: '' })}
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
