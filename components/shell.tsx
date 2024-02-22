import { cn } from '@/lib/utils'

type ShellProps = React.HTMLAttributes<HTMLDivElement>

function Shell({ children, className }: ShellProps) {
  return (
    <div
      className={cn(
        'border-border border backdrop-blur-[2px]',
        'w-full rounded-lg px-3 py-4 md:p-6',
        className
      )}
    >
      {children}
    </div>
  )
}

export { Shell }
