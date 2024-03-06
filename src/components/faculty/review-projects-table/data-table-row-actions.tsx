'use client'

import { MoreHorizontal, UsersIcon } from 'lucide-react'
import { toast } from 'sonner'

import { approveProject, rejectProject } from '@/src/app/actions/faculty/review'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'

import { Project } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const projectData = row.original as Project

  const handleApprove = async () => {
    const result = await approveProject(projectData.id)

    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  const handleReject = async () => {
    const result = await rejectProject(projectData.id)

    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DialogTrigger asChild>
            <DropdownMenuItem>View detail</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleApprove}>Approve</DropdownMenuItem>
            <DropdownMenuItem onClick={handleReject}>Reject</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className='md:min-w-[600px]'>
        <DialogHeader className='space-y-4'>
          <DialogTitle>{projectData.title}</DialogTitle>
          <Badge className='max-w-fit'>{(row.original as Project).programme}</Badge>
          <div className='text-foreground'>{projectData.semester}</div>
          <div>{projectData.description}</div>
        </DialogHeader>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
