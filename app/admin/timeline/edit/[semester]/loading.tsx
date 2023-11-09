import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
	return (
		<div className='w-full rounded-lg px-3 py-4 md:p-8 space-y-4'>
			<Skeleton className='h-8 w-full' />
			<Skeleton className='h-4 w-full' />

			<Skeleton className='h-96 w-full' />
		</div>
	)
}

export default Loading
