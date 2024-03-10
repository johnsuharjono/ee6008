import { z } from 'zod'

import { TypographyH2 } from '@/src/components/typography'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'

import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  programme: z.string(),
  faculty: z.string(),
  description: z.string()
})

type Project = z.infer<typeof projectSchema>

const ProjectDetailModal = ({
  projectData,
  setModalOpen
}: {
  projectData: Project
  setModalOpen?: (bool: boolean) => void
}) => {
  return (
    <>
      <DialogHeader className='space-y-4'>
        <DialogTitle>
          <TypographyH2>{projectData.title}</TypographyH2>
        </DialogTitle>
        <div className='flex items-center gap-2'>
          <Badge className='max-w-fit'>{projectData.programme}</Badge>
        </div>
        <div className='flex justify-between items-center text-foreground'>
          <div className='text-sm lg:text-md'>Faculty member: {projectData.faculty}</div>
        </div>
        <div>{projectData.description}</div>
      </DialogHeader>
      <DialogFooter className='sm:justify-start'>
        {setModalOpen ? (
          <DialogClose onClick={() => setModalOpen(false)}>
            <Button variant='default'>Close</Button>
          </DialogClose>
        ) : (
          <DialogClose asChild>
            <Button variant='default'>Close</Button>
          </DialogClose>
        )}
      </DialogFooter>
    </>
  )
}

export default ProjectDetailModal
