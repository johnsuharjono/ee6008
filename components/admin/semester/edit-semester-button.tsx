import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EditSemesterButton = ({ semester }: { semester: string | undefined }) => {
	if (!semester) return null
	return (
		<Link href={`/admin/semester/edit/${semester}`}>
			<Button>Edit semester</Button>
		</Link>
	)
}

export default EditSemesterButton
