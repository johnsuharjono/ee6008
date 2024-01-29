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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData extends { id: string }>({
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter()

	const handleDelete = async (row: Row<TData>) => {
		async function deleteProject(projectId: string) {
			try {
				const response = await fetch('/api/faculty/project', {
					method: 'DELETE',
					body: JSON.stringify({
						projectId,
					}),
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				return data
			} catch (error) {
				console.error('Error:', error)
				throw error
			}
		}

		toast.promise(deleteProject(row.original.id), {
			loading: 'Loading...',
			success: (data) => {
				router.refresh()
				return `${data.project.title} proposals has been deleted`
			},
			error: 'Error',
		})
	}

	return (
		<AlertDialog>
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

					<AlertDialogTrigger asChild>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						proposals.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							handleDelete(row)
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
