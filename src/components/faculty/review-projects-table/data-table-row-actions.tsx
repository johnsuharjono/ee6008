'use client'

import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveProject, rejectProject } from '@/src/app/actions/faculty/review'
import ProjectDetailModal from '@/src/components/common/project-detail-modal'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/src/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'

import { RejectProposalModal } from '../reject-proposal-modal'
import { Project } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [dialogToShow, setDialogToShow] = useState<'projectDetail' | 'reject' | null>(null)
  const projectData = row.original as Project

  const handleApprove = async () => {
    const result = await approveProject(projectData.id)

    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setDialogToShow('projectDetail')
              setModalOpen(true)
            }}
          >
            View detail
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleApprove}>Approve</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDialogToShow('reject')
                setModalOpen(true)
              }}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className='md:min-w-[600px]'>
        {dialogToShow === 'projectDetail' ? (
          <ProjectDetailModal projectData={projectData} />
        ) : (
          <RejectProposalModal projectId={projectData.id} setModalOpen={setModalOpen} />
        )}
      </DialogContent>
    </Dialog>
  )
}
