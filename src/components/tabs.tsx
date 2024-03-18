import { Separator } from '@/src/components/ui/separator'
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger
} from '@/src/components/ui/tabs'
import { cn } from '@/src/lib/utils'

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnTabsList>) {
  return (
    <>
      <ShadcnTabsList
        className={cn(
          'w-full justify-start overflow-x-auto overflow-y-hidden rounded-none bg-transparent p-0',
          className
        )}
        {...props}
      />
      <Separator className='mb-6' />
    </>
  )
}

export function TabsTrigger({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnTabsTrigger>) {
  return (
    <ShadcnTabsTrigger
      className={cn(
        'relative rounded-none border-b-4 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-muted-foreground shadow-none transition-none hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
        className
      )}
      {...props}
    />
  )
}

export function Tabs(props: React.ComponentPropsWithoutRef<typeof ShadcnTabs>) {
  return <ShadcnTabs {...props} />
}

export function TabsContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnTabsContent>) {
  return <ShadcnTabsContent className={cn('w-full', className)} {...props} />
}
