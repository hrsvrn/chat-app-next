import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800 rounded-[8px]', // Custom border radius
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200 rounded-[8px]', // Custom border radius
        destructive: "bg-red-600 text-white hover:bg-red-500 rounded-[8px]", // Custom border radius
        outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-800 rounded-[8px]", // Custom border radius
        secondary: "bg-gray-600 text-white hover:bg-gray-500 rounded-[8px]", // Custom border radius
        link: "text-blue-500 underline-offset-4 hover:underline rounded-[8px]", // Custom border radius
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading}
      {...props}>
      {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  )
}

export default Button
