'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import DateTimePickerFormInput from '@/components/ui/date-time-picker-form-input'
import { EditTimelineDataFormSchema } from '@/lib/schema'
import { FormInput } from 'lucide-react'
import { editTimeline } from '@/actions/timeline'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function EditTimelineForm({
	defaultValues,
	semesterName,
}: {
	defaultValues?: z.infer<typeof EditTimelineDataFormSchema>
	semesterName: string
}) {
	const router = useRouter()
	const form = useForm<z.infer<typeof EditTimelineDataFormSchema>>({
		resolver: zodResolver(EditTimelineDataFormSchema),
		defaultValues: defaultValues,
	})

	async function onSubmit(data: z.infer<typeof EditTimelineDataFormSchema>) {
		const result = await editTimeline(data)
		if (result.status === 'ERROR') {
			toast.error(result.message)
		} else {
			toast.success(result.message)
			router.push(`/admin/timeline?semester=${semesterName}`)
			router.refresh()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 my-2'>
				{/* Hidden form field for id */}
				<FormField
					control={form.control}
					name='semesterId'
					render={({ field }) => (
						<FormItem className='hidden m-0'>
							<FormInput {...field} type='hidden' />
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
					name='facultyProposalReview'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Proposal Review</FormLabel>
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
