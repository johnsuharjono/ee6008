'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { editProject } from '@/src/app/actions/common/project'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Textarea } from '@/src/components/ui/textarea'
import { EditProjectFormSchema } from '@/src/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Project, Venue } from '@prisma/client'

type ProposalFormValues = z.infer<typeof EditProjectFormSchema>

interface EditProjectFormProps {
  data: Project & { semesterId: string; programmeName: string }
  programmeOptions: string[]
  venueOptions: Venue[]
}

export function EditProjectForm({ data, programmeOptions, venueOptions }: EditProjectFormProps) {
  const router = useRouter()

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(EditProjectFormSchema),
    defaultValues: {
      title: data.title,
      programme: data.programmeName,
      description: data.description,
      projectId: data.id,
      semesterId: data.semesterId,
      venueId: data.venueId
    }
  })

  async function onSubmit(values: z.infer<typeof EditProjectFormSchema>) {
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
              <Select onValueChange={field.onChange} defaultValue={data.programmeName}>
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
          name='venueId'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel>Venue</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={data.venueId || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup className='overflow-y-auto max-h-[10rem]'>
                    {venueOptions.map(({ id, name, location }) => (
                      <SelectItem key={id} value={id}>
                        {name} - {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
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
