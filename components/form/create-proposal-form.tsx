'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { programmes } from './data'
import { toast } from 'sonner'

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.',
    }),
  programme: z.string({
    required_error: 'Please select a thematic programme for the project.',
  }),
  numberOfStudents: z.coerce
    .number()
    .gte(3, 'Must be greater than 3')
    .lte(5, 'Must be less than 5'),
  summary: z.string().max(1000).min(1),
})

type ProposalFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<ProposalFormValues> = {}

export function CreateProposalForm() {
  // 1. Define your form.
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))

    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        return `${values.title} proposals has been added`
      },
      error: 'Error',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your project title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='numberOfStudents'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Students</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select the number of students' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='3'>3</SelectItem>
                    <SelectItem value='4'>4</SelectItem>
                    <SelectItem value='5'>5</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='programme'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programme</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a thematic programme for the project' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programmes.map((programme) => (
                      <SelectItem key={programme} value={programme}>
                        {programme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter a short summary of your project'
                  className='h-[200px] resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 1000 characters are allowed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
