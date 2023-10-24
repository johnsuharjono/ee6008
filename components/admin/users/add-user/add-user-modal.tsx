'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface AddUserModalProps {
	role: UserRole
	isModalOpen: boolean
	setModalOpen: (bool: boolean) => void
}

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required.',
	}),
	email: z.string().min(1, {
		message: 'User email is required.',
	}),
	password: z.string().min(1, {
		message: 'User password is required.',
	}),
})

export const AddUserModal = ({
	isModalOpen,
	setModalOpen,
	role,
}: AddUserModalProps) => {
	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const res = await fetch(`/api/users`, {
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password,
					role,
				}),
				method: 'POST',
			})

			const data = await res.json()
			console.log(data)

			if (res.status === 200) {
				toast.success(`User created succesfully`)
			}

			if (res.status === 409) {
				toast.error('User already exists.')
			}

			if (res.status === 400) {
				toast.error(data.message)
			}

			setModalOpen(false)
			form.reset()
			router.refresh()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={() => setModalOpen(!isModalOpen)}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl text-center'>
						Create a {role.toLowerCase()} user
					</DialogTitle>
					<DialogDescription className='text-lg text-center'>
						Enter your email below to create your account
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<div className='grid gap-4 py-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type='password' disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button className='w-full' disabled={isLoading}>
								Create user
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
