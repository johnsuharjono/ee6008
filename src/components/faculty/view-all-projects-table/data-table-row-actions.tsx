'use client'

import { Expand } from 'lucide-react'

import ProjectDetailModal from '@/src/components/common/project-detail-modal'
import { Button } from '@/src/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/src/components/ui/sheet'
import { Row } from '@tanstack/react-table'

import { TypographyH4, TypographyP } from '../../typography'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Separator } from '../../ui/separator'
import { Textarea } from '../../ui/textarea'
import { Project } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const projectData = row.original as Project

  const { title, description, faculty, id, programme, projectCode, semester } = projectData

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='link'>
          <Expand size={14} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Project Detail</SheetTitle>
          <SheetDescription>View project details</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <TypographyH4>Title:</TypographyH4>
            <TypographyP>{title}</TypographyP>
            <Separator />
          </div>
          <div className='space-y-2'>
            <TypographyH4>Project Code:</TypographyH4>
            <TypographyP>{projectCode}</TypographyP>
            <Separator />
          </div>
          <div className='space-y-2'>
            <TypographyH4>Programme:</TypographyH4>
            <TypographyP>{programme}</TypographyP>
            <Separator />
          </div>
          <div className='space-y-2'>
            <TypographyH4>Semester:</TypographyH4>
            <TypographyP>{semester}</TypographyP>
            <Separator />
          </div>
          <div className='space-y-2'>
            <TypographyH4>Faculty:</TypographyH4>
            <TypographyP>{faculty}</TypographyP>
            <Separator />
          </div>
          <div className='space-y-2'>
            <TypographyH4>Description:</TypographyH4>
            <TypographyP>{description}</TypographyP>
            <Separator />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
