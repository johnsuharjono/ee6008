'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SelectSemester({
  options,
  defaultValue
}: {
  options: string[]
  defaultValue?: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const createPageURL = (semesterId: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('semester', semesterId.toString())
    return `${pathname}?${params.toString()}`
  }

  const handleChange = (value: string) => {
    replace(createPageURL(value))
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a semester' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Semesters</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
