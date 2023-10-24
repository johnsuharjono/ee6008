'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'

import { z } from 'zod'
import { DataTableRowActions } from './data-table-row-actions'

export const projectSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	facultyId: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
	{
		enableSorting: false,
		accessorKey: 'id',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Id' />
		},
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Name' />
		},
		cell: ({ row }) => (
			<div className='capitalize min-w-[300px]'>{row.getValue('name')}</div>
		),
	},
	{
		enableSorting: false,
		accessorKey: 'email',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Email' />
		},
		cell: ({ row }) => <div>{row.getValue('email')}</div>,
	},
	{
		enableSorting: false,
		accessorKey: 'facultyId',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Faculty Id' />
		},
		cell: ({ row }) => <div>{row.getValue('facultyId')}</div>,
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return <DataTableRowActions row={row} />
		},
	},
]
