import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header | null = await getCachedGlobal('header', 1)()

  if (!headerData && process.env.IS_BUILDING === 'true') return null

  return <HeaderClient data={headerData!} />
}
