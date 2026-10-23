'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export interface FlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  children?: ReactNode
  variant?: 'default' | 'compact' | 'icon' | 'swatch'
}

/** Shared with the static portfolio's action links through the flow-button CSS. */
export function FlowButton({ text = 'Modern Button', children, variant = 'default', className = '', type = 'button', ...props }: FlowButtonProps) {
  const arrows = variant === 'default' || variant === 'compact'
  return (
    <button {...props} type={type} className={`flow-button flow-button--${variant} ${className}`}>
      {arrows && <ArrowRight className="flow-arrow flow-arrow--in" aria-hidden="true" />}
      <span className="flow-content">{children ?? text}</span>
      <span className="flow-fill" aria-hidden="true" />
      {arrows && <ArrowRight className="flow-arrow flow-arrow--out" aria-hidden="true" />}
    </button>
  )
}
