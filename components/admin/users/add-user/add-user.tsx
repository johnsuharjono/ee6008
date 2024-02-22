'use client'
import { useState } from 'react'
import { AddUserModal } from './add-user-modal'
import { Button } from '../../../ui/button'
import { UserRole } from '@prisma/client'

const AddUser = ({ role }: { role: UserRole }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Add user</Button>
      <AddUserModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        role={role}
      />
    </>
  )
}

export default AddUser
