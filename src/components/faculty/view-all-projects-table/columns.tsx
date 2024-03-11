'use client'

import { z } from 'zod'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  programme: z.string(),
  faculty: z.string(),
  semester: z.string(),
  description: z.string(),
  projectCode: z.string()
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
  {
    enableSorting: false,
    accessorKey: 'projectCode',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Project Code' />
    },
    cell: ({ row }) => <div className='capitaliz'>{row.getValue('projectCode')}</div>
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Title' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('title')}</div>
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
    accessorKey: 'faculty',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Faculty' />
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('faculty')}</div>
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
