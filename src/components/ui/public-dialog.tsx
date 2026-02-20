"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const PublicDialog = DialogPrimitive.Root;
const PublicDialogTrigger = DialogPrimitive.Trigger;
const PublicDialogPortal = DialogPrimitive.Portal;

const PublicDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
PublicDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const PublicDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    variant?: "success" | "error";
  }
>(({ className, children, variant, ...props }, ref) => (
  <PublicDialogPortal>
    <PublicDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-6 border bg-white p-10 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl",
        className
      )}

      {...props}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {variant === "success" && (
          <div className="p-3 bg-green-50 rounded-full mb-2">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
        )}
        {variant === "error" && (
          <div className="p-3 bg-red-50 rounded-full mb-2">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
        )}
        {children}
      </div>
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 opacity-70 transition-opacity hover:opacity-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </PublicDialogPortal>
));
PublicDialogContent.displayName = DialogPrimitive.Content.displayName;

const PublicDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center items-center justify-center",
      className
    )}
    {...props}
  />
);
PublicDialogHeader.displayName = "PublicDialogHeader";

const PublicDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-3xl font-bold tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
));
PublicDialogTitle.displayName = DialogPrimitive.Title.displayName;

const PublicDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-lg text-gray-500 max-w-[350px] mx-auto", className)}
    {...props}
  />
));
PublicDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  PublicDialog,
  PublicDialogPortal,
  PublicDialogOverlay,
  PublicDialogTrigger,
  PublicDialogContent,
  PublicDialogHeader,
  PublicDialogTitle,
  PublicDialogDescription,
};
