import _ from 'lodash'

import { handleAllocation } from '@/src/app/actions/admin/allocation'
import FileUpload from '@/src/components/file-upload'
import { Header } from '@/src/components/header'

const UploadAllocationPage = async () => {
  return (
    <div className='space-y-4'>
      <Header title='Upload' description='The excel sheet for student registration' />
      <FileUpload submitFunction={handleAllocation} />
    </div>
  )
}

export default UploadAllocationPage
