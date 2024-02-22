import { CheckCircle2, FileCheck, Loader, XCircle } from 'lucide-react'

export const statuses = [
  {
    value: 'pending',
    label: 'Pending',
    icon: Loader
  },
  {
    value: 'approved',
    label: 'Approved',
    icon: FileCheck
  },
  {
    value: 'rejected',
    label: 'Rejected',
    icon: XCircle
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircle2
  }
]
