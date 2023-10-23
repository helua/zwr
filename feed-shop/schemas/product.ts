import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Default variant',
      name: 'defaultProductVariant',
      type: 'productVariant',
    }),
    defineField({
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'productVariant',
        },
      ],
    }),
    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'vendor',
      title: 'Vendor',
      type: 'reference',
      to: {type: 'vendor'},
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    }),
    defineField({
      name: 'statuses',
      title: 'Statuses',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'status'},
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    })
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {...selection}
    },
  },
})
