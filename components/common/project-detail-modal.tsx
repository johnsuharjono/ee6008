import { TypographyH2 } from '../typography'
import { Badge } from '../ui/badge'
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import { z } from 'zod'
import { Button } from '../ui/button'

export const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	programme: z.string(),
	faculty: z.string(),
	semester: z.string(),
	description: z.string(),
})

type Project = z.infer<typeof projectSchema>

const ProjectDetailModal = ({ projectData }: { projectData: Project }) => {
	return (
		<DialogContent className='md:min-w-[600px]'>
			<DialogHeader className='space-y-4'>
				<DialogTitle>
					<TypographyH2>{projectData.title}</TypographyH2>
				</DialogTitle>
				<div className='flex items-center gap-2'>
					<Badge className='max-w-fit'>{projectData.programme}</Badge>
					<Badge className='max-w-fit'>
						<div>{projectData.semester}</div>
					</Badge>
				</div>
				<div className='flex justify-between items-center text-foreground'>
					<div className='text-sm lg:text-md'>
						Faculty member: {projectData.faculty}
					</div>
				</div>
				<div>{projectData.description}</div>
			</DialogHeader>
			<DialogFooter className='sm:justify-start'>
				<DialogClose asChild>
					<Button variant='default'>Close</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}

export default ProjectDetailModal
