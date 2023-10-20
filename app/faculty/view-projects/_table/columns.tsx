'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { statuses } from './data/config'

import { z } from 'zod'

export const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	status: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Title' />
		},
		cell: ({ row }) => (
			<div className='capitalize min-w-[300px]'>{row.getValue('title')}</div>
		),
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
			return value.includes(row.getValue(id))
		},
	},
	{
		enableSorting: false,
		accessorKey: 'numberOfStudents',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Group size' />
		},
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('numberOfStudents')}</div>
		),
	},
	{
		enableSorting: false,
		accessorKey: 'programme',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Programme' />
		},
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('programme')}</div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return <DataTableRowActions row={row} />
		},
	},
]
