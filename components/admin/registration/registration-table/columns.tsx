'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'

import { z } from 'zod'

export const projectSchema = z.object({
	projectId: z.string(),
	projectTitle: z.string(),
	numberOfRegistrations: z.number(),
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
	{
		enableSorting: false,
		accessorKey: 'projectId',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Id' />
		},
		cell: ({ row }) => <div>{row.getValue('projectId')}</div>,
	},
	{
		enableSorting: false,
		accessorKey: 'projectTitle',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Title' />
		},
		cell: ({ row }) => <div>{row.getValue('projectTitle')}</div>,
	},
	{
		enableSorting: false,
		accessorKey: 'numberOfRegistrations',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Number of Registrations'
				/>
			)
		},
		cell: ({ row }) => <div>{row.getValue('numberOfRegistrations')}</div>,
	},
]
