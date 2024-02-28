'use client'

import _ from 'lodash'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Row } from '@tanstack/react-table'

import { Allocation } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const data = row.original as Allocation
  const studentDetails = data.students

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DialogTrigger asChild>
            <DropdownMenuItem>View members</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
          <DialogDescription>
            <Table className='mt-2'>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Student Id</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentDetails.map(({ name, matriculationNumber, studentId }) => (
                  <TableRow key={matriculationNumber}>
                    <TableCell className='font-medium'>{matriculationNumber}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{studentId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
