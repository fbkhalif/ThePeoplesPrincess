import React from "react"

export function PrimaryButton(children, className, ...props) {
  return (
    <button
      /* className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "font-semibold py-2 px-4 rounded-md",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
        className
      ) */
      {...props}>
      {children}
    </button>
  )
}
