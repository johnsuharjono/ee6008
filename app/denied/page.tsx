import Link from 'next/link'

const DeniedPage = () => {
	return (
		<div className='h-screen flex items-center justify-center flex-col gap-4'>
			<h1 className='text-5xl'>Access denied</h1>
			<h2 className='text-3xl'>You are not authorized to view this page.</h2>
			<Link className='text-blue-500' href='/'>
				Go back to home
			</Link>
		</div>
	)
}

export default DeniedPage
