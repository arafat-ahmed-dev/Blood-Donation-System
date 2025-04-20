// lib/redis.ts
import {Redis} from '@upstash/redis'

if (!process.env.REDIS_URL) {
  throw new Error('❌ REDIS_URL is not defined in .env.local')
}

console.log('✅ Loaded REDIS_URL:', process.env.REDIS_URL)

const redis = new Redis({
  url: 'https://optimum-pigeon-19641.upstash.io',
  token: 'AUy5AAIjcDExOTM2NzIyZmFmZjM0MWM2OGM2YWI2MTQ3NzAxZjc2NXAxMA',
})

export default redis
