import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 cursor-pointer",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                secondary:
                    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
                outline:
                    "border border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700",
                ghost:
                    "bg-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
                link:
                    "bg-transparent underline-offset-4 text-primary-600 hover:underline dark:text-primary-400",
                add:
                "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
                icon: "h-10 w-10 p-0",
            },
            rounded: {
                none: "rounded-none",
                sm: "rounded",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            rounded: "md",
        },
    }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            loading = false,
            disabled,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref
    ) => {
        const isIconOnly = size === "icon";

        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size, rounded }), className)}
                disabled={disabled || loading}
                aria-busy={loading || undefined}
                {...props}
            >
                {loading && (
                    <Loader2
                        className={cn(
                            "animate-spin",
                            isIconOnly ? "h-5 w-5" : "h-4 w-4",
                            // ensure spinner is visible on any bg
                            variant === "secondary" || variant === "outline" || variant === "ghost"
                                ? "text-current"
                                : "text-white"
                        )}
                        aria-hidden="true"
                    />
                )}

                {!isIconOnly && leftIcon ? (
                    <span className={cn(loading && "opacity-0")}>{leftIcon}</span>
                ) : null}

                {!isIconOnly && (
                    <span className={cn(loading && "opacity-0")}>{children}</span>
                )}

                {!isIconOnly && rightIcon ? (
                    <span className={cn(loading && "opacity-0")}>{rightIcon}</span>
                ) : null}

                {isIconOnly && !loading ? children : null}
            </button>
        );
    }
);

Button.displayName = "Button";

