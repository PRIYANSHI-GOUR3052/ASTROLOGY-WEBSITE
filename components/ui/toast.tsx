"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  // Ultra-modern base styles with enhanced glassmorphism and micro-interactions
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-3xl border border-white/20 p-6 pr-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out backdrop-blur-xl bg-white/85 dark:bg-neutral-900/85 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=open]:duration-700 data-[state=closed]:duration-300 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100 border-neutral-200/50 dark:border-neutral-700/50 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]",
        success: "bg-gradient-to-br from-emerald-50/95 to-green-50/95 dark:from-emerald-950/95 dark:to-green-950/95 text-emerald-900 dark:text-emerald-100 border-emerald-200/60 dark:border-emerald-800/60 shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
        error: "bg-gradient-to-br from-red-50/95 to-rose-50/95 dark:from-red-950/95 dark:to-rose-950/95 text-red-900 dark:text-red-100 border-red-200/60 dark:border-red-800/60 shadow-[0_0_30px_rgba(239,68,68,0.15)] dark:shadow-[0_0_30px_rgba(239,68,68,0.1)]",
        info: "bg-gradient-to-br from-blue-50/95 to-cyan-50/95 dark:from-blue-950/95 dark:to-cyan-950/95 text-blue-900 dark:text-blue-100 border-blue-200/60 dark:border-blue-800/60 shadow-[0_0_30px_rgba(59,130,246,0.15)] dark:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
        warning: "bg-gradient-to-br from-amber-50/95 to-yellow-50/95 dark:from-amber-950/95 dark:to-yellow-950/95 text-amber-900 dark:text-amber-100 border-amber-200/60 dark:border-amber-800/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] dark:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
        destructive: "bg-gradient-to-br from-red-500/95 to-red-600/95 text-white border-red-600/60 shadow-[0_0_40px_rgba(239,68,68,0.3)] backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      // Ultra-modern button with enhanced animations
      "inline-flex h-10 shrink-0 items-center justify-center rounded-2xl border-none bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-5 text-sm font-semibold shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95 backdrop-blur-sm group-[.destructive]:from-red-600 group-[.destructive]:to-red-700 group-[.destructive]:text-white group-[.destructive]:hover:from-red-700 group-[.destructive]:hover:to-red-800 group-[.destructive]:shadow-red-500/25",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      // Modern close button with enhanced hover states
      "absolute right-3 top-3 rounded-full p-2.5 text-neutral-500 dark:text-neutral-400 bg-white/80 dark:bg-neutral-800/80 shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transform hover:scale-110 active:scale-95 group-hover:opacity-100 backdrop-blur-sm group-[.destructive]:bg-red-600/20 group-[.destructive]:text-red-100 group-[.destructive]:hover:bg-red-600/30 group-[.destructive]:hover:text-white",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none tracking-tight bg-gradient-to-r from-current to-current/80 bg-clip-text",
      className
    )}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(
      "text-sm opacity-90 leading-relaxed mt-1",
      className
    )}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}