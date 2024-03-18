import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { FormControl } from '@/src/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { cn } from '@/src/lib/utils'

import { Calendar } from './calendar'
import { TimePicker } from './time-picker'

interface DateTimePickerFormInputProps {
  value: {
    from: Date
    to: Date
  }
  onChange: (...event: any[]) => void
}

const DateTimePickerFormInput = ({ value, onChange }: DateTimePickerFormInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn('flex h-fit justify-start gap-1 text-left font-normal', !value && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            <div className='min-h-fit'>
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'PPP HH:mm:ss')} - {format(value.to, 'PPP HH:mm:ss')}
                  </>
                ) : (
                  format(value.from, 'PPP HH:mm:ss')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar initialFocus mode='range' selected={value} onSelect={onChange} numberOfMonths={2} />
        <div className='grid justify-center gap-y-2 border-t border-border p-3 md:grid-cols-2'>
          <TimePicker
            setDate={(date) => {
              onChange({
                ...value,
                from: date
              })
            }}
            date={value?.from}
          />
          <TimePicker
            setDate={(date) => {
              onChange({
                ...value,
                to: date
              })
            }}
            date={value?.to}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DateTimePickerFormInput
