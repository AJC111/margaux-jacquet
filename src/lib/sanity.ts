import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'ujmup2s8',
  dataset: 'production',
  apiVersion: '2023-05-20',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
