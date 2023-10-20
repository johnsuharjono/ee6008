import { DataTable } from './_table/data-table'
import { columns } from './_table/columns'
import { getProjects } from './_table/data/helper'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const CreateProposal = async () => {
	const projects = await getProjects()

	const session = await getServerSession(authOptions)
	const user = session?.user

	if (!user) return null

	const myProjects = await prisma.project.findMany({
		where: {
			faculty: {
				user: {
					id: user.id,
				},
			},
		},
	})

	console.log(myProjects)

	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<h1 className='text-3xl font-semibold truncate'>View all projects</h1>
				<h2 className='text-muted-foreground'>
					Check the status of your project below
				</h2>
				<DataTable columns={columns} data={myProjects} />
			</div>
		</div>
	)
}

export default CreateProposal
