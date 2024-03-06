'use client'
import { Icons } from '@/src/components/icons'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Table } from '@tanstack/react-table'

import { statuses } from './config'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  semesterOptions: { label: string; value: string }[]
}

export function DataTableToolbar<TData>({ table, semesterOptions }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search projects...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={statuses} />
        )}
        {table.getColumn('semester') && (
          <DataTableFacetedFilter column={table.getColumn('semester')} title='Semester' options={semesterOptions} />
        )}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <Icons.close className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}