'use client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { setActiveSemester } from '@/src/app/actions/admin/semester'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui/button'

const FormSchema = z.object({
  semesterId: z.string({
    required_error: 'Please select a semester'
  })
})

export function SelectActiveSemester({
  options,
  defaultValue
}: {
  options: { semesterId: string; semesterName: string }[]
  defaultValue?: string
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      semesterId: defaultValue
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await setActiveSemester(data.semesterId)
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  const isFormTouched = form.formState.isDirty

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-1'>
        <FormField
          control={form.control}
          name='semesterId'
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a semester' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Semesters</SelectLabel>
                    {options.map(({ semesterId, semesterName }) => (
                      <SelectItem key={semesterId} value={semesterId}>
                        {semesterName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isFormTouched} variant={'link'} type='submit'>
          Change
        </Button>
      </form>
    </Form>
  )
}
