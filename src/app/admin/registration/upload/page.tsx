import _ from 'lodash'

import { handleAllocation } from '@/src/app/actions/allocation'
import FileUpload from '@/src/components/file-upload'
import { Header } from '@/src/components/header'

const UploadAllocationPage = async () => {
  return (
    <div className='space-y-4'>
      <Header title='Upload' description='The excel sheet for student registration' />
      <div className='w-96'>
        <FileUpload submitFunction={handleAllocation} />
      </div>
    </div>
  )
}

export default UploadAllocationPage
