'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { statuses } from './config'

import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  proposer: z.string(),
  description: z.string(),
  semester: z.string(),
  programme: z.string()
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value.toUpperCase() === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
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
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('semester')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    enableSorting: false,
    accessorKey: 'proposer',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Proposer' />
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('proposer')}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    }
  }
]
