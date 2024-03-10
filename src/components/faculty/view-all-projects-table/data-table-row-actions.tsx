'use client'

import { MoreHorizontal } from 'lucide-react'

import ProjectDetailModal from '@/src/components/common/project-detail-modal'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/src/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'

import { Project } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const projectData = row.original as Project

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
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='md:min-w-[600px]'>
        <ProjectDetailModal projectData={projectData} />
      </DialogContent>
    </Dialog>
  )
}
