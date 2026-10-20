'use client'

import React, { useState } from 'react'

export const CopyBibtex: React.FC<{ bibtex: string; label: string; copiedLabel: string }> = ({
  bibtex,
  label,
  copiedLabel,
}) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(bibtex)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          setCopied(false)
        }
      }}
      className="label-mono border border-rule px-2 py-1 transition-colors hover:border-accent hover:text-foreground"
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
