import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EditTimelineButton = ({ semester }: { semester: string | undefined }) => {
	if (!semester) return null
	return (
		<Link href={`/admin/timeline/edit/${semester}`}>
			<Button>Edit timeline</Button>
		</Link>
	)
}

export default EditTimelineButton
