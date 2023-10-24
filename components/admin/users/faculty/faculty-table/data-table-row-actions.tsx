'use client'

import { MoreHorizontal } from 'lucide-react'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import EditUserDataModal from '../../modals/edit-user-data-modal'
import DeleteUserModal from '../../modals/delete-user-modal'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

type dialogToShow = 'name' | 'email' | 'password' | 'delete'

export function DataTableRowActions<TData extends { id: string }>({
	row,
}: DataTableRowActionsProps<TData>) {
	const [isModalOpen, setModalOpen] = useState<boolean>(false)
	const [dialogToShow, setDialogToShow] = useState<dialogToShow | null>(null)

	return (
		<AlertDialog open={isModalOpen}>
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
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onClick={() => {
										setDialogToShow('name')
										setModalOpen(true)
									}}
								>
									Name
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setDialogToShow('email')
										setModalOpen(true)
									}}
								>
									Email
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setDialogToShow('password')
										setModalOpen(true)
									}}
								>
									Password
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem
						onClick={() => {
							setDialogToShow('delete')
							setModalOpen(true)
						}}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Edit and delete user modal */}
			<AlertDialogContent>
				{dialogToShow === 'delete' ? (
					<DeleteUserModal
						setModalOpen={setModalOpen}
						userId={row.original.id}
					/>
				) : (
					<EditUserDataModal
						field={dialogToShow}
						setModalOpen={setModalOpen}
						initialValue={{
							name: row.getValue('name'),
							email: row.getValue('email'),
							userId: row.original.id,
						}}
					/>
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}
