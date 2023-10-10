import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'

export async function getProjects() {
	const data = await fs.readFile(
		path.join(
			process.cwd(),
			'app/faculty/view-projects/_table/data/projects.json'
		)
	)

	const projects = JSON.parse(data.toString())
	return projects
}
