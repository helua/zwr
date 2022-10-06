export default {
  title: 'Product variant',
  name: 'productVariant',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
    },
    {
      title: 'Total lenght in cm',
      name: 'length',
      type: 'number',
    },
    {
      title: 'Total width in cm',
      name: 'width',
      type: 'number',
    },
    {
      title: 'Total height in cm',
      name: 'height',
      type: 'number',
    },
    {
      title: 'Unfold lenght in cm',
      name: 'lengthUnfold',
      type: 'number',
    },
    {
      title: 'Unfold width in cm',
      name: 'widthUnfold',
      type: 'number',
    },
    {
      title: 'Unfold height in cm',
      name: 'heightUnfold',
      type: 'number',
    },
    {
      title: 'Taxable',
      name: 'taxable',
      type: 'boolean',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: 'Bar code',
      name: 'barcode',
      type: 'barcode',
    },
  ],
}
