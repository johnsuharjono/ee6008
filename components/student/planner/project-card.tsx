import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Grip } from 'lucide-react'

interface Props {
  data: {
    id: string
    title: string
    faculty: string
    programme: string
  }
  index: number
  isActive: boolean
}

export function ProjectCard({ data, index, isActive }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='cursor-default'
    >
      <Card
        className={cn(
          'p-6 flex flex-col justify-between gap-8 min-h-full',
          !isActive && 'opacity-40'
        )}
      >
        <div className='flex justify-between gap-4'>
          <h1 className='text-xl'>{data.title}</h1>
          <div {...listeners} className='cursor-grab'>
            <Grip />
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-muted-foreground'>{data.faculty}</h2>
          <div className='flex justify-between'>
            <Badge>{data.programme}</Badge>
            {isActive && (
              <Badge variant={'secondary'}>Priority {index + 1}</Badge>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
