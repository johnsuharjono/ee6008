import { cn } from '@/lib/utils'

export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className='scroll-m-20 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight'>
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='scroll-m-20 border-b pb-2 text-lg md:text-xl lg:text-2xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-md md:text-lg font-medium tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  )
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className='leading-7 [&:not(:first-child)]:mt-6'>{children}</p>
}
