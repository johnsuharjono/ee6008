import Link from 'next/link'

import { Button } from '@/src/components/ui/button'

const EditTimelineButton = ({ semester }: { semester: string | undefined }) => {
  if (!semester) return null
  return (
    <Link href={`/admin/timeline/edit/${semester}`}>
      <Button>Edit timeline</Button>
    </Link>
  )
}

export default EditTimelineButton
