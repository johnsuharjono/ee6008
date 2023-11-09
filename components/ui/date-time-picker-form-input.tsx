import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './calendar'
import { TimePicker } from './time-picker'

interface DateTimePickerFormInputProps {
	value: {
		from: Date
		to: Date
	}
	onChange: (...event: any[]) => void
}

const DateTimePickerFormInput = ({
	value,
	onChange,
}: DateTimePickerFormInputProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={'outline'}
						className={cn(
							'w-[500px] justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{value?.from ? (
							value.to ? (
								<>
									{format(value.from, 'PPP HH:mm:ss')} -{' '}
									{format(value.to, 'PPP HH:mm:ss')}
								</>
							) : (
								format(value.from, 'PPP HH:mm:ss')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					initialFocus
					mode='range'
					selected={value}
					onSelect={onChange}
					numberOfMonths={2}
				/>
				<div className='p-3 border-t border-border grid grid-cols-2'>
					<TimePicker
						setDate={(date) => {
							onChange({
								...value,
								from: date,
							})
						}}
						date={value?.from}
					/>
					<TimePicker
						setDate={(date) => {
							onChange({
								...value,
								to: date,
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
