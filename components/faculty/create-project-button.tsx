import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CreateProjectButton = ({
  semester
}: {
  semester: string | undefined
}) => {
  if (!semester) return null
  return (
    <Link href={`/faculty/add-project/form?semester=${semester}`}>
      <Button>Add project</Button>
    </Link>
  )
}

export default CreateProjectButton
