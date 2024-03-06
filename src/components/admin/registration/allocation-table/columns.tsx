'use client'

import { z } from 'zod'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const projectAllocationSchema = z.object({
  projectId: z.string(),
  projectTitle: z.string(),
  numberOfStudents: z.number(),
  students: z.array(
    z.object({
      matriculationNumber: z.string(),
      name: z.string(),
      studentId: z.string()
    })
  ),
  status: z.union([z.literal('open'), z.literal('cancelled')])
})

export type Allocation = z.infer<typeof projectAllocationSchema>

export const columns: ColumnDef<Allocation>[] = [
  {
    enableSorting: false,
    accessorKey: 'projectId',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Id' />
    },
    cell: ({ row }) => <div>{row.getValue('projectId')}</div>
  },
  {
    enableSorting: false,
    accessorKey: 'projectTitle',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Title' />
    },
    cell: ({ row }) => <div>{row.getValue('projectTitle')}</div>
  },
  {
    enableSorting: true,
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Status' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>
  },
  {
    enableSorting: true,
    accessorKey: 'numberOfStudents',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Group size' />
    },
    cell: ({ row }) => <div>{row.getValue('numberOfStudents')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
