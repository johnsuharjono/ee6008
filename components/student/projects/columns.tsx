'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { convertProgrammeName } from '@/lib/helper'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Project = {
	id: string
	title: string
	supervisor: string
	programme: string
	semester: string
	description: string
	numberOfStudents: number
}

export const columns: ColumnDef<Project>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Title' />
		},
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('title')}</div>
		),
	},
	{
		accessorKey: 'supervisor',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Supervisor' />
		},
		cell: ({ row }) => <div>{row.getValue('supervisor')}</div>,
	},
	{
		accessorKey: 'programme',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Programme' />
		},
		cell: ({ row }) => (
			<div>{convertProgrammeName(row.getValue('programme'))}</div>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return <DataTableRowActions row={row} />
		},
	},
]
