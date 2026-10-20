import { getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'

import { portfolioTag } from '@/lib/tags'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    await seed({ payload })
    revalidateTag(portfolioTag)
    revalidateTag('sitemap')

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
