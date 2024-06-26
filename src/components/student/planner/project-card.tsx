import { Grip } from 'lucide-react'
import React from 'react'

import { Badge } from '@/src/components/ui/badge'
import { Card } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className='cursor-default touch-none'>
      <Card className={cn('flex min-h-full flex-col justify-between gap-8 p-6', !isActive && 'opacity-40')}>
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
            {isActive && <Badge variant={'secondary'}>Priority {index + 1}</Badge>}
          </div>
        </div>
      </Card>
    </div>
  )
}
