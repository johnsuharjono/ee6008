'use client'

import { z } from 'zod'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
  projectId: z.string(),
  projectTitle: z.string(),
  projectCode: z.string(),
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
    accessorKey: 'projectCode',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Project Code' />
    },
    cell: ({ row }) => <div>{row.getValue('projectCode')}</div>
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
