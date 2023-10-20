import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContainer } from './_components/card-container'
import { getPlans } from './_data/helper'
import { Grip } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const ProjectPlan = async () => {
	const session = await getServerSession(authOptions)
	const user = session?.user
	if (!user) return null

	const plans = await getPlans()
	return (
		<section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
			<div className='container flex max-w-[80rem] flex-col gap-4'>
				<h1 className='text-3xl font-semibold'>Welcome back, {user?.name}!</h1>
				<h3 className='text-muted-foreground text-lg'>
					Start planning your project
				</h3>
				<Alert className='max-w-[800px]'>
					<Grip className='h-4 w-4' />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription className='mt-2'>
						<p className='md:text-md'>
							Drag and drop the projects to your preference. Only the first 3
							will be submitted.
							<br />
							Click on the card to view project details
						</p>
					</AlertDescription>
				</Alert>
				<CardContainer plans={plans} />
			</div>
		</section>
	)
}

export default ProjectPlan