'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import DateTimePickerFormInput from '@/components/ui/date-time-picker-form-input'
import { AddTimelineDataFormSchema } from '@/lib/schema'
import { createSemesterTimeline } from '@/actions/timeline'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

export function CreateTimelineForm() {
	const router = useRouter()
	const form = useForm<z.infer<typeof AddTimelineDataFormSchema>>({
		resolver: zodResolver(AddTimelineDataFormSchema),
	})

	async function onSubmit(data: z.infer<typeof AddTimelineDataFormSchema>) {
		const result = await createSemesterTimeline(data)
		if (result.status === 'ERROR') {
			toast.error(result.message)
		} else {
			toast.success(result.message)
			router.push(`/admin/timeline?semester=${data.semesterName}`)
			router.refresh()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 my-2'>
				<FormField
					control={form.control}
					name='semesterName'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Semester name</FormLabel>
							<FormControl>
								<Input
									placeholder='Input semester name'
									className='max-w-[250px]'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Must be in format of XXSY where X is start year and Y is
								semester.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='facultyProposalSubmission'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Staff Proposal Submission</FormLabel>
							<DateTimePickerFormInput
								value={field.value}
								onChange={field.onChange}
							/>
							<FormDescription>
								Period for when faculty member can submit proposals
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='studentRegistration'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Student Selection</FormLabel>
							<DateTimePickerFormInput
								value={field.value}
								onChange={field.onChange}
							/>
							<FormDescription>
								Period for when students can select projects
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='markEntry'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Mark Entry</FormLabel>
							<DateTimePickerFormInput
								value={field.value}
								onChange={field.onChange}
							/>
							<FormDescription>
								Period for when staff can mark entry
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='peerReview'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Peer review</FormLabel>
							<DateTimePickerFormInput
								value={field.value}
								onChange={field.onChange}
							/>
							<FormDescription>
								Period for when students can do peer review
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}
