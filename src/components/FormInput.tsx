import  { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const inputVariants = cva(
  // Base styles
  "block w-full outline-none rounded-md transition shadow-sm " +
    "border bg-white text-gray-900 placeholder:text-gray-400 " +
    "focus:ring-1 disabled:opacity-60 disabled:cursor-not-allowed " +
    "dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3.5",
        lg: "h-11 px-4 text-base",
      },
      variant: {
        default:
          "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 " +
          "dark:border-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500/30",
        ghost:
          "border-transparent bg-transparent focus:border-blue-500 " +
          "focus:ring-blue-500/20 dark:focus:ring-blue-500/30",
      },
      invalid: {
        true:
          "border-red-500 focus:border-red-500 focus:ring-red-500/20 " +
          "dark:focus:ring-red-500/30",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      invalid: false,
    },
  }
);

type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants> & {
    invalid?: boolean;
  };

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, size, variant, invalid, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={clsx(inputVariants({ size, variant, invalid }), className)}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";


export default FormInput;