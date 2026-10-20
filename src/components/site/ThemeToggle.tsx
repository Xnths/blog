'use client'

import { useTheme } from '@/providers/Theme'
import { Moon, Sun } from 'lucide-react'
import React from 'react'

export const ThemeToggle: React.FC<{ label: string }> = ({ label }) => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-8 w-8 items-center justify-center border border-rule text-foreground transition-colors hover:border-accent"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  )
}
