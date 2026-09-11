import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  value?: React.ReactNode
  sublabel?: React.ReactNode
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, sublabel, icon, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: {
        value: 'text-3xl md:text-4xl',
        label: 'text-sm md:text-base',
      },
      md: {
        value: 'text-4xl md:text-5xl',
        label: 'text-base md:text-lg',
      },
      lg: {
        value: 'text-5xl md:text-6xl',
        label: 'text-lg md:text-xl',
      },
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-start gap-2', className)}
        {...props}
      >
        <div className="flex items-center gap-3 w-full">
          {icon && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className={cn('font-heading font-bold text-accent leading-none', sizes[size].value)}>
              {value}
            </div>
          </div>
        </div>
        <div className={cn('font-heading font-semibold text-muted-foreground', sizes[size].label)}>
          {label}
        </div>
        {sublabel && (
          <div className="text-xs text-muted-foreground">
            {sublabel}
          </div>
        )}
      </div>
    )
  }
)
Stat.displayName = 'Stat'

export { Stat }
