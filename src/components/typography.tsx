import { cn } from '@/src/lib/utils'

export function TypographyH1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cn('scroll-m-20 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='scroll-m-20 pb-2 text-lg md:text-xl lg:text-2xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>{children}</h3>
}

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={cn('scroll-m-20 text-md md:text-lg font-medium tracking-tight', className)}>{children}</h4>
}

export function TypographyP({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
}
