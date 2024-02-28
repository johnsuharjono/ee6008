'use client'
import * as XLSX from 'xlsx'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import Dropzone from './dropzone'
import { FileCheck2Icon } from 'lucide-react'
import { Button } from './ui/button'

const FileUpload = () => {
  const defaultValues: { file: null | File } = {
    file: null
  }
  const methods = useForm({
    defaultValues,
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false
  })

  const handleFormSubmit = async (data: { file: File | null }) => {
    console.log(data)
    if (data.file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target) return
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        console.log(JSON.stringify(json, null, 2))
      }
      reader.readAsBinaryString(data.file)
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
        methods.setValue('file', null)
        methods.setError('file', {
          message: 'File type is not valid',
          type: 'typeError'
        })
      } else {
        methods.setValue('file', acceptedFiles[0])
        methods.clearErrors('file')
      }
    } else {
      methods.setValue('file', null)
      methods.setError('file', {
        message: 'File is required',
        type: 'typeError'
      })
    }
  }
  return (
    <FormProvider {...methods}>
      <form
        className='flex flex-col items-center justify-center w-100 gap-2'
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        noValidate
        autoComplete='off'
      >
        <FormField
          control={methods.control}
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
        {methods.watch('file') && (
          <div className='flex items-center justify-center gap-3 p-4 relative'>
            <FileCheck2Icon className='h-4 w-4' />
            <p className='text-sm font-medium'>{methods.watch('file')?.name}</p>
          </div>
        )}
        <Button type='submit'>Save</Button>
      </form>
    </FormProvider>
  )
}

export default FileUpload
