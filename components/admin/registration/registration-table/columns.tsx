'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { z } from 'zod'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
  projectId: z.string(),
  projectTitle: z.string(),
  totalSignUps: z.number(),
  registrantDetails: z.array(
    z.object({
      matriculationNumber: z.string(),
      name: z.string(),
      priority: z.number()
    })
  )
})

export type Registration = z.infer<typeof projectSchema>

export const columns: ColumnDef<Registration>[] = [
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
    enableSorting: false,
    accessorKey: 'totalSignUps',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Total Sign Ups' />
    },
    cell: ({ row }) => <div>{row.getValue('totalSignUps')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
