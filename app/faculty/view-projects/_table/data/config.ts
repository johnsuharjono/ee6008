import { CheckCircle2, Loader, Timer } from 'lucide-react'

export const statuses = [
	{
		value: 'pending',
		label: 'Pending',
		icon: Loader,
	},
	{
		value: 'in progress',
		label: 'In Progress',
		icon: Timer,
	},
	{
		value: 'completed',
		label: 'Completed',
		icon: CheckCircle2,
	},
]
