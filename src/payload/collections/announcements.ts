import type { CollectionConfig } from 'payload/types'
import { COLLECTION_SLUG_ANNOUNCEMENTS } from './config'
import { revalidateTag } from 'next/cache'
import { generateDocumentCacheKey } from '@/payload/utils/getDocument'
import { isAdmin, isAdminOrPublished } from '@/payload/access'

export const announcements: CollectionConfig = {
  slug: COLLECTION_SLUG_ANNOUNCEMENTS,
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['message', 'updatedAt', 'createdAt']
  },
  versions: false,
  access: {
    read: isAdminOrPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  hooks: {
    afterChange: [
      async ({ doc, collection }) => {
        revalidateTag(generateDocumentCacheKey(collection.slug, doc.path))
      }
    ]
  },
  fields: [
    {
      type: 'text',
      name: 'message'
    },
  ]
}
