import { CheckCircle2, Loader, Timer } from 'lucide-react'

const thematicOptions = [
	'Computer Control & Automation',
	'Communication Engineering',
	'Signal Processing',
	'Power Engineering',
	'Electronics',
]

export const thematicsFilterOptions = thematicOptions.map((thematic) => ({
	value: thematic,
	label: thematic,
}))
