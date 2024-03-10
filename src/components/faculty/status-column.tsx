import { TypographyH1, TypographyH4, TypographyP } from '@/src/components/typography'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/src/components/ui/dialog'
import { Separator } from '@/src/components/ui/separator'

import { Project } from './view-my-projects-table/columns'
import { statuses } from './view-my-projects-table/config'

interface StatusColumnProps {
  project: Project
}

const StatusColumn = ({ project }: StatusColumnProps) => {
  const statusObj = statuses.find((obj) => obj.value.toUpperCase() === project.status)

  if (!statusObj) {
    return null
  }
  if (project.status !== 'REJECTED' || !project.reviewMessage) {
    return (
      <div className='flex w-[100px] items-center'>
        {statusObj.icon && <statusObj.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
        <span>{statusObj.label}</span>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex w-[100px] items-center underline decoration-dotted cursor-pointer underline-offset-4'>
          {statusObj.icon && <statusObj.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{statusObj.label}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <TypographyH1>{project.title}</TypographyH1>
        <Separator />
        <div className='space-y-3'>
          <Badge>{project.semester}</Badge>
          <TypographyH4>Rejected by {project.reviewer}</TypographyH4>
          <div className='space-y-1'>
            <TypographyH4>Reason:</TypographyH4>
            <TypographyP>{project.reviewMessage}</TypographyP>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Okay</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StatusColumn
