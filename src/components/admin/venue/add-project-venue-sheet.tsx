'use client'

import { PointerEventHandler, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/tabs'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'

import AddSingleVenueForm from './form/add-single-venue-form'
import UploadVenueForm from './form/upload-venue-form'

interface AddProjectVenueSheetProps {
  semestersData: { id: string; name: string }[]
}

export function AddProjectVenueSheet<TData>({ semestersData }: AddProjectVenueSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='default'>Add</Button>
      </SheetTrigger>
      <SheetContent className='rounded-t-[10px]'>
        <SheetHeader>
          <SheetTitle>Add Venue</SheetTitle>
          <SheetDescription>
            Fill the details for your project venue here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Tabs className='mt-4'>
          <TabsList>
            <TabsTrigger value='single-venue'>Single Venue</TabsTrigger>
            <TabsTrigger value='upload-venue'>Upload Venue</TabsTrigger>
          </TabsList>
          <TabsContent value='single-venue'>
            <AddSingleVenueForm semestersData={semestersData} closeSheet={() => setOpen(false)}></AddSingleVenueForm>
          </TabsContent>
          <TabsContent value='upload-venue'>
            <UploadVenueForm semestersData={semestersData} closeSheet={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
