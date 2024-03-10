'use client'

import { z } from 'zod'

import { ColumnDef } from '@tanstack/react-table'

import StatusColumn from '../status-column'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  programme: z.string(),
  reviewer: z.string(),
  semester: z.string(),
  reviewMessage: z.string().nullable()
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Title' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('title')}</div>
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => <StatusColumn project={row.original} />,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string
      return value.includes(rowValue.toLowerCase())
    }
  },
  {
    enableSorting: false,
    accessorKey: 'semester',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Semester' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('semester')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    enableSorting: false,
    accessorKey: 'programme',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Programme' />
    },
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('programme')}</div>
    }
  },
  {
    enableSorting: false,
    accessorKey: 'reviewer',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Reviewer' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('reviewer')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
