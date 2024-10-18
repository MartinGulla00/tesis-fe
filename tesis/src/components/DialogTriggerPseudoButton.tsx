import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/common/useMediaQuery";

type Props = {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "default" | "lg" | "icon";
  onClick?: () => void;
  className?: string;
};

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand-green hover:bg-brand-green/75 text-zinc-50 dark:bg-brand-orange dark:hover:bg-brand-orange/75 shadow-sm ",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-zinc-400 bg-zinc-200 shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-zinc-200 text-zinc-900 shadow-sm hover:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost:
          "hover:bg-zinc-300 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function DialogTriggerPseudoButton({
  text,
  icon,
  variant,
  size,
  onClick,
  className,
}: Props) {
  const { isMobile } = useMediaQuery();

  if (isMobile && !size) {
    size = "sm";
  }
  let marginLeft = "ml-2";
  if (!icon) {
    marginLeft = "";
  }
  return (
    <div
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {icon && <span>{icon}</span>}
      {!isMobile && size !== "icon" && (
        <span className={marginLeft}>{text}</span>
      )}
    </div>
  );
}

export default DialogTriggerPseudoButton;
