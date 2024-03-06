'use client'

import { z } from 'zod'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  studentId: z.string(),
  matriculationNumber: z.string()
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
  {
    enableSorting: true,
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Name' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    enableSorting: false,
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Email' />
    },
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    enableSorting: false,
    accessorKey: 'matriculationNumber',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Matric No.' />
    },
    cell: ({ row }) => <div>{row.getValue('matriculationNumber')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
