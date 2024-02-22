'use client'
import { setActiveSemester } from '@/actions/semester'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'

export function SelectActiveSemester({
  options,
  defaultValue
}: {
  options: { semesterId: string; semesterName: string }[]
  defaultValue?: string
}) {
  const handleChange = async (semesterId: string) => {
    const result = await setActiveSemester(semesterId)
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a semester' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Semesters</SelectLabel>
          {options.map(({ semesterId, semesterName }) => (
            <SelectItem key={semesterId} value={semesterId}>
              {semesterName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
