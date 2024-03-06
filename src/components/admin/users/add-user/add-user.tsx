'use client'
import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import { UserRole } from '@prisma/client'

import { AddFacultyModal } from './add-faculty-modal'
import { AddStudentModal } from './add-student-modal'

const AddUser = ({ role }: { role: UserRole }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Add user</Button>
      {role === 'FACULTY' && <AddFacultyModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />}
      {role === 'STUDENT' && <AddStudentModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />}
    </>
  )
}

export default AddUser
