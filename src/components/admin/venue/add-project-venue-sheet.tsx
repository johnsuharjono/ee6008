'use client'

import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { addVenue, editVenue } from '@/src/app/actions/admin/venue'
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/src/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddProjectVenueSheetProps {
  semesterId: string
}

export function AddProjectVenueSheet<TData>({ semesterId }: AddProjectVenueSheetProps) {
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    location: z.string().min(2, {
      message: 'Location must be at least 2 characters.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const response = await addVenue({ name: values.name, location: values.location, semesterId })
    if (response.status === 'ERROR') {
      toast.error(response.message)
    } else {
      toast.success(response.message)
      router.refresh()
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='default'>Add</Button>
      </SheetTrigger>
      <SheetContent className='rounded-t-[10px]'>
        <SheetHeader>
          <SheetTitle>Add Venue</SheetTitle>
          <SheetDescription>
            Fill the details for your project venue here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-4'>
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

            <SheetFooter>
              <SheetClose asChild>
                <Button variant='default' type='submit'>
                  Save
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
