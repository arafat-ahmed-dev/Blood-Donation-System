"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle,
} from "lucide-react";
import type { IconType } from "@/lib/auth-errors";

// Function to render icon based on string type
const renderIcon = (icon: string | undefined) => {
  if (!icon) return null;

  const iconClasses = "h-5 w-5 mr-2";

  switch (icon as IconType) {
    case "alert-circle":
      return <AlertCircle className={iconClasses} />;
    case "alert-triangle":
      return <AlertTriangle className={iconClasses} />;
    case "info":
      return <Info className={iconClasses} />;
    case "x-circle":
      return <XCircle className={iconClasses} />;
    case "check-circle":
      return <CheckCircle className={iconClasses} />;
    default:
      return null;
  }
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-start">
              {icon && renderIcon(icon as string)}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
