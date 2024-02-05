'use client'

import { MoreHorizontal, UsersIcon } from 'lucide-react'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Project } from './columns'
import { convertProgrammeName } from '@/lib/helper'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const projectData = row.original as Project

	return (
		<Dialog>
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
					<DialogTrigger asChild>
						<DropdownMenuItem>View detail</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent className='md:min-w-[600px]'>
				<DialogHeader className='space-y-4'>
					<DialogTitle>{projectData.title}</DialogTitle>
					<Badge className='max-w-fit'>
						{convertProgrammeName((row.original as any).programme)}
					</Badge>
					<div className='flex justify-between items-center text-foreground'>
						<div>{projectData.semester}</div>
						<div className='flex items-center gap-1'>
							{projectData.numberOfStudents}
							<UsersIcon />
						</div>
					</div>
					<div>{projectData.description}</div>
				</DialogHeader>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
