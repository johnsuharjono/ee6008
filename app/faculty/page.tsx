import { Skeleton } from '@/components/ui/skeleton'

const FacultyPage = () => {
	return (
		<div>
			{/* Work in progress.. */}
			<h1>Faculty Dashboard</h1>
			<div className='flex gap-12 py-6 px-4'>
				<Skeleton className='h-[400px] w-full' />
				<Skeleton className='h-[400px] w-full' />
			</div>
		</div>
	)
}

export default FacultyPage
