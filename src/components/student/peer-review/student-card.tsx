import { Grip } from 'lucide-react'
import React from 'react'

import { Card } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Badge } from '../../ui/badge'

interface Props {
  peer: {
    id: string
    name: string
  }
  index: number
  isActive: boolean
}

export function StudentCard({ peer, index, isActive }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: peer.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className='cursor-default touch-none'>
      <Card className={cn('flex min-h-full flex-col justify-between gap-8 p-6', !isActive && 'opacity-40')}>
        <div className='flex gap-6'>
          <Badge variant={'secondary'}>Rank {index + 1}</Badge>
          <h1 className='flex-1 text-xl'>{peer.name}</h1>
          <div {...listeners} className='cursor-grab'>
            <Grip />
          </div>
        </div>
      </Card>
    </div>
  )
}
