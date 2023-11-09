import { CreateTimelineForm } from '@/components/admin/timeline/create-timeline-form'
import { Header } from '@/components/header'

const AddTimeline = async () => {
	return (
		<div className='space-y-4'>
			<Header
				title='Add new timeline'
				description='Select semester and add timeline period!'
			/>

			<CreateTimelineForm />
		</div>
	)
}

export default AddTimeline
