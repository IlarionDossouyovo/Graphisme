import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all'

    const variants = {
      default: 'bg-premium-card border border-white/10',
      glass: 'glass-card',
      outline: 'bg-transparent border border-white/10',
    }

    const hoverStyles = hover ? 'hover:border-gold/30 hover:shadow-lg' : ''

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
