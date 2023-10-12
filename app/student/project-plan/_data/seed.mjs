import fs from 'fs'
import path from 'path'
import { faker, simpleFaker } from '@faker-js/faker'
import { fileURLToPath } from 'url'

const programmes = {
	CommunicationsEngineering: 'Communications Engineering',
	ComputerControlAndAutomation: 'Computer Control & Automation',
	Electronics: 'Electronics',
	PowerEngineering: 'Power Engineering',
	SignalProcessing: 'Signal Processing',
}

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const plans = Array.from({ length: 8 }, () => ({
	id: simpleFaker.string.uuid(),
	title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
	faculty: faker.person.fullName(),
	programme: faker.helpers.arrayElement(Object.values(programmes)),
}))

fs.writeFileSync(
	path.join(__dirname, 'plans.json'),
	JSON.stringify(plans, null, 2)
)

console.log('✅ Project data generated.')
