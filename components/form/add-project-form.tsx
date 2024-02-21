'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { PROGRAMMES } from '@/config/programmes'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

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
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { addProject } from '@/actions/project'
import { ProgrammeName } from '@prisma/client'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	title: z
		.string()
		.min(2, {
			message: 'Title must be at least 2 characters.',
		})
		.max(50, {
			message: 'Title must not be longer than 50 characters.',
		}),
	programme: z.nativeEnum(ProgrammeName, {
		errorMap: () => {
			return { message: 'Please select correct programme' }
		},
	}),
	numberOfStudents: z.coerce
		.number({
			invalid_type_error: 'Please select a number of students',
			required_error: 'Please select a number of students.',
		})
		.gte(3, 'Must be greater than 3')
		.lte(5, 'Must be less than 5'),
	description: z.string().max(1000).min(1),
	semesterId: z.string(),
})

type ProposalFormValues = z.infer<typeof formSchema>

export function AddProjectForm({ semesterId }: { semesterId: string }) {
	const router = useRouter()
	const session = useSession()
	const user = session?.data?.user

	const form = useForm<ProposalFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			semesterId,
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!user?.facultyId) return
		const response = await addProject({ ...values, facultyId: user?.facultyId })
		if (response.status === 'ERROR') {
			toast.error(response.message)
		} else {
			toast.success(response.message)
			router.push(`/faculty/view-my-projects`)
			router.refresh()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='semesterId'
					render={({ field }) => (
						<FormItem className='hidden m-0'>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>This is your project title.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='grid gap-y-8 md:grid-cols-3 md:gap-4'>
					<FormField
						control={form.control}
						name='numberOfStudents'
						render={({ field }) => (
							<FormItem className='md:col-span-1'>
								<FormLabel>Number of Students</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='3'>3</SelectItem>
										<SelectItem value='4'>4</SelectItem>
										<SelectItem value='5'>5</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='programme'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Programme</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PROGRAMMES.map((programme) => (
											<SelectItem key={programme.value} value={programme.value}>
												{programme.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Enter a short summary of your project'
									className='h-[300px] resize-none'
									{...field}
								/>
							</FormControl>
							<FormDescription>Max 1000 characters are allowed</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}
