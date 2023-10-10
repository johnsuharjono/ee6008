import fs from 'fs'
import path from 'path'
import { faker, simpleFaker } from '@faker-js/faker'
import { fileURLToPath } from 'url'

import { CheckCircle2, Loader, Timer } from 'lucide-react'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

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

const tasks = Array.from({ length: 5 }, () => ({
	id: simpleFaker.string.uuid(),
	title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
	status: faker.helpers.arrayElement(statuses).value,
}))

fs.writeFileSync(
	path.join(__dirname, 'projects.json'),
	JSON.stringify(tasks, null, 2)
)

console.log('✅ Project data generated.')
