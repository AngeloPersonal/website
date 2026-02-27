import {defineType, defineArrayMember, defineField} from 'sanity'
import LatexIcon from '../icons/latex'
import MathIcon from '../icons/math'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
	title: 'Block Content',
	name: 'blockContent',
	type: 'array',
	of: [
		defineArrayMember({
			title: 'Block',
			type: 'block',
			// Inline latex
			of: [
				defineArrayMember({
					type: "latex",
					title: "Inline math",
					icon: MathIcon,
				}),
			],
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{title: 'Normal', value: 'normal'},
				// {title: 'H1', value: 'h1'}, // This is set automatically as the post title
				{title: 'H1', value: 'h2'},
				{title: 'H2', value: 'h3'},
				{title: 'H3', value: 'h4'},
				{title: 'Quote', value: 'blockquote'},
			],
			lists: [{title: 'Bullet', value: 'bullet'}],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [
					{title: 'Strong', value: 'strong'},
					{title: 'Emphasis', value: 'em'},
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: 'URL',
						name: 'link',
						type: 'object',
						fields: [
							{
								title: 'URL',
								name: 'href',
								type: 'url',
							},
						],
					},
				],
			},
		}),
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		defineArrayMember({
			type: 'image',
			options: {hotspot: true},
			fields:[
				defineField({
					name:'alt',
					type:'string',
					validation:Rule => Rule.required(),
				}),
				defineField({
					name:'caption',
					type:'string',
				}),
			],
			validation:Rule=>Rule.required().assetRequired(),
		}),
		/// https://www.sanity.io/plugins/code-input
		defineArrayMember({
			type: "code",
			options: {
				language: 'text',
				languageAlternatives: [
					{title: 'JavaScript', value: 'javascript'},
					{title: 'Rust', value: 'rust', mode: 'rust'},
					{title: 'Text', value: 'text'},
					{title: 'GROQ', value: 'groq'},
				],
			},
		}),
		/// https://www.sanity.io/plugins/sanity-plugin-latex-input
		defineArrayMember({
			type: "latex",
			title: "",
			icon: LatexIcon,
		}),
	],
})
