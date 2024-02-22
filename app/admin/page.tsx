import { redirect } from 'next/navigation'

const AdminPage = () => {
  redirect('/admin/users/manage-faculty')
}

export default AdminPage
