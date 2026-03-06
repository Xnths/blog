// components/Analytics.tsx
"use client"

import { useEffect } from "react"
import { analytics } from "@/lib/firebase"

export default function Analytics() {
  useEffect(() => {
    const _init = analytics // just importing + running initializes it
  }, [])

  return null
}
