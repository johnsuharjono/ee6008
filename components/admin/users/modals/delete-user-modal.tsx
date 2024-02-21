// @ts-ignore
import { useFormStatus, useFormState } from 'react-dom'
import { toast } from 'sonner'
import { useEffect } from 'react'
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { deleteUser } from '@/actions/user'
import { Input } from '@/components/ui/input'

interface DeleteUserModalProps {
	setModalOpen: (bool: boolean) => void
	userId: string
}

const initialState = {
	message: '',
	status: '',
}

const DeleteUserModal = ({ setModalOpen, userId }: DeleteUserModalProps) => {
	const { pending } = useFormStatus()
	const [state, formAction] = useFormState(deleteUser, initialState)

	useEffect(() => {
		if (state.status == 'OK') toast.success(state.message)
		else if (state.status === 'ERROR') toast.error(state.message)
	}, [state.status, toast])

	return (
		<>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<form
				action={(payload) => {
					formAction(payload)
					setModalOpen(false)
				}}
			>
				<Input type='hidden' defaultValue={userId} name='userId' />
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setModalOpen(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction type='submit' disabled={pending}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</form>
		</>
	)
}

export default DeleteUserModal
