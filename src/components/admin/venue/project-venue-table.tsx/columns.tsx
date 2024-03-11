'use client'

import { z } from 'zod'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const ProjectVenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  semesterId: z.string(),
  semesterName: z.string()
})

export type Venue = z.infer<typeof ProjectVenueSchema>

export const columns: ColumnDef<Venue>[] = [
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
    accessorKey: 'location',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Location' />
    },
    cell: ({ row }) => <div>{row.getValue('location')}</div>
  },
  {
    enableSorting: false,
    accessorKey: 'semesterName',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Semester' />
    },
    cell: ({ row }) => <div>{row.getValue('semesterName')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} key={row.original.id} />
    }
  }
]
