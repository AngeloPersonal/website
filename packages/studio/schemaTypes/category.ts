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
      name: 'parent',
      title: 'Parent category',
      type: 'reference', 
      to: {type: 'category'},
      options: {
				filter: ({document}) => {
					const id = (document?._id || "").replace(/^drafts\./, "")
					return {
						filter: "_id != $id",
						params: {id},
					}
				},
			},
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
  preview: {
		select: {title: "title", subtitle: "parent.title"},
		prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? `> ${subtitle}` : ""}),
	},
})
