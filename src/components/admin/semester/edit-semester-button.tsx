import Link from 'next/link'

import { Button } from '@/src/components/ui/button'

const EditSemesterButton = ({ semester }: { semester: string | undefined }) => {
  if (!semester) return null
  return (
    <Link href={`/admin/semester/edit/${semester}`}>
      <Button>Edit semester</Button>
    </Link>
  )
}

export default EditSemesterButton
