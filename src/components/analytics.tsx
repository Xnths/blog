// components/Analytics.tsx
"use client"

import { useEffect } from "react"
import { analytics } from "@/lib/firebase"

export default function Analytics() {
  useEffect(() => {
    analytics // just importing + running initializes it
  }, [])

  return null
}
