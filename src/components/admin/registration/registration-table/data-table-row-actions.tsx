'use client'

import _ from 'lodash'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/src/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { Row } from '@tanstack/react-table'

import { Registration } from './columns'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const data = row.original as Registration
  const registrantDetails = data.registrantDetails
  const [page, setPage] = useState(0)
  const registrationDetailsSplitted = _.chunk(registrantDetails, 5)
  const paginationLength = registrationDetailsSplitted.length

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
            <DropdownMenuItem>View registrants</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrant Details</DialogTitle>

          <Table className='mt-2'>
            <TableHeader>
              <TableRow>
                <TableHead>Matric No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrationDetailsSplitted[page].map(({ name, matriculationNumber, priority }) => (
                <TableRow key={matriculationNumber}>
                  <TableCell className='font-medium'>{matriculationNumber}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              {Array.from({ length: paginationLength }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink className='text-primary' isActive={i === page} onClick={() => setPage(i)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
