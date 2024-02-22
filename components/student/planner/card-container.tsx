'use client'

import { useState } from 'react'
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
} from '@dnd-kit/sortable'

import { ProjectCard } from '@/components/student/planner/project-card'
import { Button } from '@/components/ui/button'
import { registerProjects } from '@/actions/student/register'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export type TItem = {
	id: string
	title: string
	faculty: string
	programme: string
}

interface CardContainerProps {
	plans: TItem[]
	projectApplicationLimit: number
}

export function CardContainer({
	plans,
	projectApplicationLimit,
}: CardContainerProps) {
	const studentId = useSession().data?.user?.studentId
	const [items, setItems] = useState<TItem[]>(plans)

	const sensors = useSensors(useSensor(PointerSensor))

	if (!studentId) return null

	const handleRegister = async () => {
		const sanitizedRegister = items.slice(0, 3).map((item, i) => ({
			id: item.id,
			priority: i + 1,
		}))
		const result = await registerProjects(sanitizedRegister, studentId)

		if (result.status === 'ERROR') {
			toast.error(result.message)
		} else {
			toast.success(result.message)
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={items} strategy={rectSortingStrategy}>
				<div className='grid md:grid-cols-3 gap-4'>
					{items.map((item, i) => (
						<ProjectCard
							key={item.id}
							data={item}
							index={i}
							isActive={i < projectApplicationLimit}
						/>
					))}
				</div>
			</SortableContext>

			<div className='flex justify-end mt-8'>
				<Button onClick={handleRegister}>Register</Button>
			</div>
		</DndContext>
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (!over) return

		const activeItem = items.find((item) => item.id === active.id)
		const overItem = items.find((item) => item.id === over.id)

		if (!activeItem || !overItem) {
			return
		}

		const activeIndex = items.findIndex((item) => item.id === active.id)
		const overIndex = items.findIndex((item) => item.id === over.id)

		if (activeIndex !== overIndex) {
			setItems((prev) => arrayMove<TItem>(prev, activeIndex, overIndex))
		}
	}
}
