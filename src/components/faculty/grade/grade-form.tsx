'use client'

import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateStudentGrade } from '@/src/app/actions/faculty/mark'
import { Button } from '@/src/components/ui/button'
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
import { UpdateStudentGradeFormSchema } from '@/src/lib/schema'
import { cn } from '@/src/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

interface GradeFormProps {
  defaultValues: {
    studentId: string
    facultyId: string
    projectId: string
    grade: number | ''
    studentName: string
    matriculationNumber: string
  }[]
  semesterGradeTypeId: string
}

export function GradeForm({ defaultValues, semesterGradeTypeId }: GradeFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdateStudentGradeFormSchema>>({
    resolver: zodResolver(UpdateStudentGradeFormSchema),
    defaultValues: { studentGrades: defaultValues }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'studentGrades',
    control: form.control
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdateStudentGradeFormSchema>) {
    const filteredValues = values.studentGrades.filter((student) => student.grade !== '')
    values.studentGrades = filteredValues

    const result = await updateStudentGrade(values, semesterGradeTypeId)
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-2'>
          <div className='grid items-center gap-x-4 gap-y-4 px-1 md:grid-cols-12'>
            <div className='hidden gap-x-4 md:col-span-12 md:grid md:grid-cols-12'>
              <div className={cn('md:col-span-3 md:block')}>
                <FormLabel>Name</FormLabel>
              </div>
              <div className={cn('md:col-span-2 md:block')}>
                <FormLabel>Matric No.</FormLabel>
              </div>
              <div className={cn('md:col-span-6 md:block md:place-self-end')}>
                <FormLabel>Grade</FormLabel>
              </div>
            </div>
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <div className='text-sm md:col-span-3'>{form.getValues(`studentGrades.${index}.studentName`)}</div>
                <div className='text-sm md:col-span-2'>
                  {form.getValues(`studentGrades.${index}.matriculationNumber`)}
                </div>
                <FormField
                  control={form.control}
                  name={`studentGrades.${index}.grade`}
                  render={({ field }) => (
                    <FormItem className='md:col-span-6 md:place-self-end'>
                      <FormControl>
                        <Input className='max-w-[70px] text-right' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <FormDescription>Leave empty for no marks, grade must be between 0 and 100</FormDescription>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
