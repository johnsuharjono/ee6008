'use client'

import { MoreHorizontal } from 'lucide-react'
import { Row } from '@tanstack/react-table'

import { Registration } from './columns'
import _ from 'lodash'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'

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
          <DialogDescription>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
