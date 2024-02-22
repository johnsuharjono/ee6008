'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

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
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { editProject } from '@/actions/project'

const formSchema = z.object({
  projectId: z.string(),
  semesterId: z.string(),
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(50, {
      message: 'Title must not be longer than 50 characters.'
    }),
  programme: z.string().min(1, {
    message: 'Please select a programme'
  }),
  description: z.string().max(1000).min(1)
})

type ProposalFormValues = z.infer<typeof formSchema>

export function EditProjectForm({
  data,
  programmeOptions
}: {
  data: Project & { semesterId: string }
  programmeOptions: string[]
}) {
  const router = useRouter()

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      programme: data.programme,
      description: data.description,
      projectId: data.id,
      semesterId: data.semesterId
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await editProject(values)

    if (response.status === 'ERROR') {
      toast.error(response.message)
    } else {
      toast.success(response.message)
      router.push(`/faculty/view-my-projects`)
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Hidden field */}
        <FormField
          control={form.control}
          name='projectId'
          render={({ field }) => (
            <FormItem className='hidden m-0'>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem className='hidden m-0'>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name='programme'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Programme</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={data.programme}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programmeOptions.map((programme) => (
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
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter a short summary of your project'
                  className='h-[300px] resize-none'
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
