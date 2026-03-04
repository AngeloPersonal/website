import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {codeInput} from '@sanity/code-input'
import {latexInput} from "sanity-plugin-latex-input"
import {schemaTypes} from './schemaTypes'
import {presentationToolConfig} from './config'

/**
 * This is the configuration file for the Sanity Studio that is used to manage the content of the blog. 
 * It defines the structure of the content, the plugins that are used, and the schema for the content types.
 */
export default defineConfig({
	name: 'default',
	title: 'qwik-sanity',

	projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
	dataset: 'production',

	plugins: [
		// Tools
		structureTool(), 
		presentationTool(presentationToolConfig),
		visionTool(),
		// Input plugins
		colorInput(),
		codeInput({
			codeModes: [
				{
					name: 'rust', // The language is only loaded when it is selected
					loader: () => import('@codemirror/lang-rust').then(({rust}) => rust()),
				},
				{
					name: 'cpp',
					loader: () => import('@codemirror/lang-cpp').then(({cpp}) => cpp()),
				}
			],
		}),
		latexInput(),
	],
	schema: {
		types: schemaTypes,
	},
})