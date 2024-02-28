import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'

import _ from 'lodash'
import Dropzone from '@/components/dropzone'
import FileUpload from '@/components/file-upload'

const UploadAllocationPage = async () => {
  return (
    <div className='space-y-4'>
      <Header title='Upload' description='The excel sheet for student registration' />
      <FileUpload />
    </div>
  )
}

export default UploadAllocationPage
