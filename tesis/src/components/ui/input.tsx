import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiline?: boolean; // New prop to indicate if it should be a textarea
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type, multiline, ...props }, ref) => {
  const inputClassName = cn(
    "flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm dark:text-zinc-300 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:border-zinc-400 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
    className
  );

  if (multiline) {
    return (
      <textarea
        className={inputClassName}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      className={inputClassName}
      ref={ref as React.Ref<HTMLInputElement>}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
