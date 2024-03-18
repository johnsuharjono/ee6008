import { useEffect } from 'react'
// @ts-ignore
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { editEmail, editName, editPassword } from '@/src/app/actions/admin/user'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/src/components/ui/alert-dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'

interface EditUserDataModalProps {
  initialValue: { name?: string; userId: string; email?: string }
  field: string | null
  setModalOpen: (bool: boolean) => void
}

const initialState = {
  message: '',
  status: ''
}

const EditUserDataModal = ({ initialValue, setModalOpen, field }: EditUserDataModalProps) => {
  const { pending } = useFormStatus()

  let editFunction: (prevState: any, data: FormData) => Promise<{ message: string; status: string }>
  let initialInputValue: string | undefined

  switch (field) {
    case 'name':
      editFunction = editName
      initialInputValue = initialValue.name || ''
      break
    case 'email':
      editFunction = editEmail
      initialInputValue = initialValue.email || ''
      break
    case 'password':
      editFunction = editPassword
      initialInputValue = ''
      break
    default:
      throw new Error('Invalid field')
  }

  const [state, formAction] = useFormState(editFunction, initialState)

  useEffect(() => {
    if (state.status == 'OK') toast.success(state.message)
    else if (state.status === 'ERROR') toast.error(state.message)
  }, [state.status, state.message])

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Change name</AlertDialogTitle>
        <AlertDialogDescription>This will permanently overwrite the data</AlertDialogDescription>
      </AlertDialogHeader>

      <form
        className='space-y-2'
        action={(payload) => {
          formAction(payload)
          setModalOpen(false)
        }}
      >
        <Label className='capitalize'>{field}</Label>
        <Input required defaultValue={initialInputValue} name={field} />
        <Input type='hidden' defaultValue={initialValue.userId} name='userId' />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setModalOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction type='submit' disabled={pending}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </>
  )
}

export default EditUserDataModal
