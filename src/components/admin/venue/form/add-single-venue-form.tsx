'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { addVenue } from '@/src/app/actions/admin/venue'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddSingleVenueFormProps {
  semestersData: { id: string; name: string }[]
  closeSheet: () => void
}

export default function AddSingleVenueForm({ semestersData, closeSheet }: AddSingleVenueFormProps) {
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    location: z.string().min(2, {
      message: 'Location must be at least 2 characters.'
    }),
    semesterId: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await addVenue({ name: values.name, location: values.location, semesterId: values.semesterId })
    if (response.status === 'ERROR') {
      toast.error(response.message)
    } else {
      closeSheet()
      toast.success(response.message)
      router.refresh()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='select semester..' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {semestersData.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the semester that you want to upload the venue for</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='venue name..' {...field} />
              </FormControl>
              <FormDescription>This is the project venue name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder='venue location..' {...field} />
              </FormControl>
              <FormDescription>This is the project venue location.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button variant='default' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
