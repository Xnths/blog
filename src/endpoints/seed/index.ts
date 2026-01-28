import type { Payload } from 'payload'
import type { PayloadRequest } from 'payload'
import { homeStatic } from './home-static'

type Args = {
  payload: Payload
  req: PayloadRequest
}

export const seed = async ({ payload, req }: Args): Promise<void> => {
  payload.logger.info('Seeding database...')

  try {
    // Check if home page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      req,
    })

    if (existingPages.docs.length === 0) {
      payload.logger.info('Creating home page...')
      await payload.create({
        collection: 'pages',
        data: homeStatic,
        req,
      })
      payload.logger.info('Home page created successfully')
    } else {
      payload.logger.info('Home page already exists, skipping...')
    }

    payload.logger.info('Database seeding completed')
  } catch (error) {
    payload.logger.error('Error seeding database:')
    payload.logger.error(error)
    throw error
  }
}
