import { Skeleton } from '@/src/components/ui/skeleton'
import { cn } from '@/src/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string | null
  actions?: React.ReactNode | React.ReactNode[]
}

/**
 * use `children` to include a Button e.g.
 */
function Header({ title, description, className, actions }: HeaderProps) {
  return (
    <div className={cn('col-span-full flex items-start justify-between gap-1', className)}>
      <div className='flex min-w-0 flex-col gap-2'>
        <h1 className='text-2xl font-semibold md:text-3xl'>{title}</h1>
        {description ? <p className='text-muted-foreground'>{description}</p> : null}
      </div>
      {actions ? <div className='flex flex-1 items-center justify-end gap-2'>{actions}</div> : null}
    </div>
  )
}

function HeaderSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className='col-span-full mr-12 flex w-full justify-between lg:mr-0'>
      <div className='grid w-full gap-3'>
        <Skeleton className='h-8 w-full max-w-[200px]' />
        <Skeleton className='h-4 w-full max-w-[300px]' />
      </div>
      {children}
    </div>
  )
}

Header.Skeleton = HeaderSkeleton

export { Header }
