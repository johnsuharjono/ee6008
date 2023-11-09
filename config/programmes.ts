import { ProgrammeName } from '@prisma/client'

export const PROGRAMMES = [
	{
		name: 'Communications Engineering',
		value: ProgrammeName.CommunicationsEngineering,
	},
	{
		name: 'Computer Control & Automation',
		value: ProgrammeName.ComputerControlAndAutomation,
	},
	{ name: 'Electronics', value: ProgrammeName.Electronics },
	{ name: 'Power Engineering', value: ProgrammeName.PowerEngineering },
	{ name: 'Signal Processing', value: ProgrammeName.SignalProcessing },
]
