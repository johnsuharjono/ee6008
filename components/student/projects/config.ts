import { PROGRAMMES } from '@/config/programmes'

export const programmeFilterOptions = PROGRAMMES.map((programme) => ({
	value: programme.value,
	label: programme.name,
}))
