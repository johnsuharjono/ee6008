'use client'

import React, { useState } from 'react'
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

import { ProjectCard } from './project-card'
import { Button } from '@/components/ui/button'

export type TItem = {
	id: string
	title: string
	faculty: string
	programme: string
}

export function CardContainer({ plans }: { plans: TItem[] }) {
	const [items, setItems] = useState<TItem[]>(plans)

	const sensors = useSensors(useSensor(PointerSensor))

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={items} strategy={rectSortingStrategy}>
				<div className='grid md:grid-cols-3 gap-4'>
					{items.map((item, i) => (
						<ProjectCard key={item.id} data={item} index={i} />
					))}
				</div>
			</SortableContext>

			<div className='flex justify-end mt-8'>
				<Button>Register</Button>
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
