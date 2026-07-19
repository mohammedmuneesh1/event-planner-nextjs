"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
)
Form.displayName = "Form"

function FormField({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

function FormItem({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  )
)
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-destructive", className)} {...props} />
))
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}
