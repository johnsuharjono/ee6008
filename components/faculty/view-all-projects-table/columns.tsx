'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { z } from 'zod'
import { PROGRAMMES } from '@/config/programmes'

export const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	programme: z.string(),
	faculty: z.string(),
	semester: z.string(),
	numberOfStudents: z.number(),
	description: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export const columns: ColumnDef<Project>[] = [
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
		},
	},
	{
		enableSorting: false,
		accessorKey: 'faculty',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Faculty' />
		},
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('faculty')}</div>
		),
	},
	{
		enableSorting: false,
		accessorKey: 'programme',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Programme' />
		},
		cell: ({ row }) => {
			const value = row.getValue('programme')
			const mapping = PROGRAMMES.find((programme) => programme.value === value)
			return <div className='capitalize'>{mapping?.name}</div>
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
