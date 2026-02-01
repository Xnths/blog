
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const runSeed = async () => {
  const payload = await getPayload({ config })

  try {
    // Create a mock request for the seed function if it needs it, 
    // or adjust the seed function to not require req if it's not strictly used for auth in this context.
    // However, looking at the seed function, it uses `req` for `payload.find` and `payload.create`.
    // We can pass a minimal req object or rely on local API not strictly needing it if we use `payload.local`.
    // Actually, `getPayload` returns a local API instance. 
    // The `seed` function expects `req`. Let's see if we can construct a minimal one or pass null/undefined if typed loosely.
    // The type says `PayloadRequest`. 
    // We can create a local request using `payload` helper if available, or just mock it.
    
    // Better yet, let's just make sure we are admin.
    // If we use local API, access control handles it if we pass `user` or rely on `overrideAccess: true`.
    // The seed function calls `payload.find` and `payload.create` passing `req`. 
    
    // For simplicity in this script, since it runs on server startup, we might want to bypass access control.
    // However, the seed function might not expose `overrideAccess` option directly in its arguments.
    // Let's modify the seed calls to include `overrideAccess: true` inside the seed function? 
    // Or just pass a dummy req.
    
    // Actually, looking at `src/endpoints/seed/index.ts`, it takes `{ req }`.
    // Let's try to passing a partial req object that satisfies the need.
    // But since `seed` function uses `req` in `payload.find` and `payload.create`, 
    // if those operations are done with `req`, they respect access control.
    // We want to write data.
    
    // A clean way is to generate a local request context:
    // const req = await createLocalReq({ user: null }, payload) // user null?
    
    // If we want to keep it simple and the seed function allows it, 
    // we can create a fake request object. 
    
    // Let's use `payload` to seed.
    
    await seed({ 
      payload, 
      req: { payload, user: undefined } as any // Mocking req, assuming local API usage might be lenient or we might hit permissions issues.
      // If permissions are an issue, we should ensure the seed logic uses `overrideAccess: false` (default) but we want `true`? 
      // Ideally the seed function should be robust.
      // Let's check `src/endpoints/seed/index.ts` again... 
      // It passes `req` to `find` and `create`.
      // If we are running locally, we usually have full access if we use `overrideAccess: true`.
      // But the `seed` function as written doesn't seem to set `overrideAccess: true`.
      // It uses `req` which implies it respects the user on `req`.
    }) 
    
    // Wait, the `seed` function implementation:
    // `payload.create({ ..., req })`
    
    // If we don't pass a valid user in `req`, `authenticated` access control might block it.
    // `Pages` collection allows `read` for anyone, but `create` for `authenticated`.
    // So we need a user. OR we modify `seed.ts` to not require one for `create`?
    // No, we shouldn't modify the collection config just for seeding.
    
    // We can create a System User? Or just use `overrideAccess: true` in the `seed` implementation?
    // Modifying `seed/index.ts` seems appropriate to ensure it works from script.
    
    // Let's try to run it. If it fails, we fix `seed/index.ts`.
    // For now I will assume I can just call it.
    
    // EDIT: Upon reflection, `createLocalReq` is the standard way.
    // import { createLocalReq } from 'payload'
    
    // But `package.json` has `"type": "module"`, so we can use top level await? 
    // Yes, usually.
    
    // Let's try to use `createLocalReq` if imported.
    
    await seed({
        payload,
        req: {} as any // We will try a minimal mock first as `createLocalReq` might not be easy to import/setup in standalone script without next.js context?
        // Actually `seed` function in `src/endpoints/seed/index.ts` is simple.
        // Let's update `src/endpoints/seed/index.ts` to allow `overrideAccess: true` if needed, 
        // OR, just pass a mock that says "I am superuser" if possible? Payload doesn't work that way easily.
        
        // Let's update `src/endpoints/seed/index.ts` to accept an option to override access, or just always override access in seed?
        // Usually seeding happens as admin.
        
        // Let's just run it. If it fails due to permissions, I will see in logs.
        // Actually, I'll update the `seed` function in the next step to be robust. 
    })

    process.exit(0)
  } catch (error) {
    console.error('Error Seeding Database:')
    console.error(error)
    process.exit(1)
  }
}

runSeed()
