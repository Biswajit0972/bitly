import React from 'react'
import { AlertCircle } from 'lucide-react'
import {cn} from "../utils/cn.ts";

type InputErrorProps = {
  message?: string
  id?: string
  className?: string
  'aria-live'?: 'polite' | 'assertive' | 'off'
  hideIcon?: boolean
  as?: 'div' | 'p' | 'span'
}

const InputError: React.FC<InputErrorProps> = ({
  message,
  id,
  className = '',
  'aria-live': ariaLive = 'polite',
  hideIcon = false,
  as: Tag = 'p',
}) => {
  if (!message) return null

  return (
    <Tag
      id={id}
      role="alert"
      aria-live={ariaLive}
      className={cn("mt-1 flex items-start gap-2 text-sm text-red-600",  className)}
    >
      {!hideIcon && (
        <AlertCircle
          className="mt-[2px] h-4 w-4 shrink-0 text-red-600"
          aria-hidden="true"
        />
      )}
      <span>{message}</span>
    </Tag>
  )
}

export default InputError
