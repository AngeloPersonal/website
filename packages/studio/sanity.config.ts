import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {defineDocuments, presentationTool} from 'sanity/presentation';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// const ARTICLE_ENDPOINT = '/article/'; 

export default defineConfig({
	name: 'default',
	title: 'qwik-sanity',

	projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
	dataset: 'production',

	plugins: [
		structureTool(), 
		presentationTool({
			previewUrl: {
				initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3001/",
				previewMode: {
					enable: "/api/draft-mode/enable",
					disable: "/api/draft-mode/disable",
				},
			},
			allowOrigins: ["http://localhost:*"],
			// resolve: {
			// 	// The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/visual-editing/presentation-resolver-api#57720a5678d9
			// 	mainDocuments: defineDocuments([
			// 		// {
			// 		// 	route: '/',
			// 		// 	filter: `_type == "settings" && _id == "siteSettings"`,
			// 		// },
			// 		// {
			// 		// 	route: '/:slug',
			// 		// 	filter: `_type == "page" && slug.current == $slug || _id == $slug`,
			// 		// },
			// 		{
			// 			route: `${ARTICLE_ENDPOINT}:slug`,
			// 			filter: `_type == "post" && slug.current == $slug || _id == $slug`,
			// 		},
			// 	]),
			// }
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
})