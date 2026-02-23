import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

console.log("EXPORTS 2:", process.env);

export default defineConfig({
  name: 'default',
  title: 'qwik-sanity',

  projectId: process.env.SANITY_PROJECT_ID || 'jx3vhi63',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
