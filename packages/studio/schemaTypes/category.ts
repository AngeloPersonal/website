import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background color',
      type: 'color',
    }),
    defineField({
      name: 'textColor',
      title: 'Text color',
      type: 'color',
    }),
  ],
})
