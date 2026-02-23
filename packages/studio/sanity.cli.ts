import {defineCliConfig} from 'sanity/cli'

// const FRONTEND_TARGET = process.env.FRONTEND_TARGET || "../frontend-next-16";
// console.log("EXPORTS:", process.env);

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID || 'jx3vhi63',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  },
  schemaExtraction: {
		enabled: true,
	},
	typegen: {
		//	scan your for GROQ queries
		path: `../../examples/**/src/**/*.{ts,tsx,js,jsx}`,
		//	static schema representation used by typegen
		schema: "schema.json",
		//	write generated types to @types/sanity-studio package
		generates: '../types/src/generated.ts',
		//	optional: makes client.fetch infer types automatically
		overloadClientMethods: true,
	},
})
