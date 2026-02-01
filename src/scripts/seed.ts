import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const runSeed = async () => {
  const payload = await getPayload({ config })

  try {
    console.log('Seeding database...')
    await seed({ 
      payload, 
      req: { payload, user: undefined } as any 
    }) 
    console.log('Seed completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error Seeding Database:')
    console.error(error)
    process.exit(1)
  }
}

runSeed()
