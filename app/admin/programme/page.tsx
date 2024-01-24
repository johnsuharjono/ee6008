import EditProgrammeButton from '@/components/admin/programme/edit-programme-button'
import { SelectSemesterWrapper } from '@/components/admin/timeline/select-semester-wrapper'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Programme = async ({
	searchParams,
}: {
	searchParams?: {
		semester: string
	}
}) => {
	return (
		<div className='space-y-4'>
			<Header
				title='Programme Management'
				description='Create edit or view programme available!'
				actions={
					<Button>
						<Link href='./programme/create'>Create</Link>
					</Button>
				}
			/>

			<div className='py-8 space-y-4'>
				<h1 className='text-xl font-medium'>Choose semester</h1>
				<div className='flex justify-between'>
					<SelectSemesterWrapper searchParams={searchParams} />
					<EditProgrammeButton semester={searchParams?.semester} />
				</div>
			</div>
		</div>
	)
}

export default Programme
