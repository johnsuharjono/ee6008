import { promises as fs } from 'fs'
import path from 'path'

export async function getPlans() {
	const data = await fs.readFile(
		path.join(process.cwd(), 'app/student/project-plan/_data/plans.json')
	)

	const plannedProjects = JSON.parse(data.toString())
	return plannedProjects
}
