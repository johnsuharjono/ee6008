'use client'
import { useState } from 'react'
import { toast } from 'sonner'

import { reviewPeers } from '@/src/app/actions/student/peer-review'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Button } from '../../ui/button'
import { StudentCard } from './student-card'

export type TItem = {
  id: string
  name: string
}

interface PeerReviewSectionProps {
  peers: TItem[]
  reviewerId: string
  projectId: string
}

const PeerReviewSection = ({ peers, reviewerId, projectId }: PeerReviewSectionProps) => {
  const [items, setItems] = useState<TItem[]>(peers)

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const handlePeerReview = async () => {
    const sanitizedPeerReview = items.map((item, i) => ({
      revieweeId: item.id,
      rank: i + 1
    }))

    const result = await reviewPeers(sanitizedPeerReview, reviewerId, projectId)

    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className='grid gap-4'>
          {items.map((item, i) => (
            <StudentCard key={item.id} peer={item} index={i} isActive={true} />
          ))}
        </div>
      </SortableContext>

      <div className='mt-8 flex justify-end'>
        <Button onClick={handlePeerReview}>Submit</Button>
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

export default PeerReviewSection
