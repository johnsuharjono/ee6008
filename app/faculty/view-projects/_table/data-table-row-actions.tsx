'use client'

import { MoreHorizontal } from 'lucide-react'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData extends { id: string }>({
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				<DropdownMenuItem
					onClick={() => router.push(`/faculty/project/${row.original.id}`)}
				>
					Edit
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
