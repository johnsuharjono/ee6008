'use client'

import { FileCheck2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'
import { z } from 'zod'

import { handleVenueUpload } from '@/src/app/actions/admin/venue'
import Dropzone from '@/src/components/dropzone'
import { Button } from '@/src/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
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

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'

interface UploadVenueSheetProps {
  semestersData: { id: string; name: string }[]
}

const formSchema = z.object({
  file: z.instanceof(File).nullable(),
  semesterId: z.string()
})

export function UploadVenueSheet({ semestersData }: UploadVenueSheetProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false
  })

  const handleFormSubmit = async ({ file, semesterId }: z.infer<typeof formSchema>) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (!e.target) return
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        const arg = JSON.parse(JSON.stringify(json))

        const result = await handleVenueUpload(arg, semesterId)
        if (result.status === 'ERROR') {
          toast.error(result.message)
        } else {
          toast.success(result.message)
          router.refresh()
        }
      }
      reader.readAsBinaryString(file)
    }
  }

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        { name: 'csv', types: ['text/csv'] },
        {
          name: 'excel',
          types: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        }
      ]
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      )
      if (!fileType) {
        form.setValue('file', null)
        form.setError('file', {
          message: 'File type is not valid',
          type: 'typeError'
        })
      } else {
        form.setValue('file', acceptedFiles[0])
        form.clearErrors('file')
      }
    } else {
      form.setValue('file', null)
      form.setError('file', {
        message: 'File is required',
        type: 'typeError'
      })
    }
  }

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button variant='default'>Upload</Button>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 left-auto right-0'>
        <div className='p-4 flex-1 h-full'>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Upload Venue</DrawerTitle>
              <DrawerDescription>Accept excel files, with 'name' and 'location' as the column name</DrawerDescription>
            </DrawerHeader>
            <div className='p-4'>
              <Form {...form}>
                <form className='space-y-8' onSubmit={form.handleSubmit(handleFormSubmit)} autoComplete='off'>
                  <FormField
                    control={form.control}
                    name='semesterId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='choose..' />
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
                    name='file'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Dropzone {...field} dropMessage='Drop files or click here' handleOnDrop={handleOnDrop} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch('file') && (
                    <div className='flex items-center justify-center gap-3 p-4 relative'>
                      <FileCheck2Icon className='h-4 w-4' />
                      <p className='text-sm font-medium'>{form.watch('file')?.name}</p>
                    </div>
                  )}

                  <DrawerFooter>
                    <Button disabled={!form.watch('file')} type='submit'>
                      Submit
                    </Button>
                    <DrawerClose asChild>
                      <Button variant='outline'>Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
