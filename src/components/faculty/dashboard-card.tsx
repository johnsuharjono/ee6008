import { LucideIceCream, LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

const DashboardCard = ({
	title,
	description,
	Icon,
}: {
	title: string
	description?: string
	Icon: LucideIcon
}) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>

				{Icon && <Icon />}
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-semibold'>{description}</div>
			</CardContent>
		</Card>
	)
}

export default DashboardCard
