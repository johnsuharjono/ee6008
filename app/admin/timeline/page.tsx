import EditTimelineButton from '@/components/admin/timeline/edit-timeline-button'
import { SelectSemesterWrapper } from '@/components/admin/timeline/select-semester-wrapper'
import { TimelineTable } from '@/components/admin/timeline/timeline-table'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

const Timeline = async ({
	searchParams,
}: {
	searchParams?: {
		semester: string
	}
}) => {
	return (
		<div className='space-y-4'>
			<Header
				title='Timeline Management'
				description='Create edit or view timeline period!'
				actions={
					<Button>
						<Link href='./timeline/create'>Create</Link>
					</Button>
				}
			/>

			<div className='py-8 space-y-4'>
				<h1 className='text-xl font-medium'>Choose semester</h1>
				<div className='flex justify-between'>
					<SelectSemesterWrapper searchParams={searchParams} />
					<EditTimelineButton semester={searchParams?.semester} />
				</div>
				<Suspense fallback={<h1>Loading...</h1>}>
					<TimelineTable searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	)
}

export default Timeline
