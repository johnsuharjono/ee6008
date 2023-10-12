import { Project, columns } from './_table/columns'
import { DataTable } from './_table/data-table'
import { projectsData } from './_seed'

async function getData(): Promise<Project[]> {
	return projectsData
}

export default async function Home() {
	const data = await getData()

	return (
		<section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
			<div className='container flex max-w-[80rem] flex-col gap-4'>
				<h1 className='text-3xl font-semibold'>Welcome back, Student!</h1>
				<h3 className='text-muted-foreground text-lg tracking-tight'>
					Here are the list of projects available:
				</h3>
				<DataTable columns={columns} data={data} />
			</div>
		</section>
	)
}
