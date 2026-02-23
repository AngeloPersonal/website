import {defineDocuments, defineLocations, DocumentLocation} from 'sanity/presentation';

// // Define the home location for the presentation tool
// const homeLocation = {
//   title: 'Home',
//   href: '/',
// } satisfies DocumentLocation

// // resolveHref() is a convenience function that resolves the URL
// // path for different document types and used in the presentation tool.
// function resolveHref(documentType?: string, slug?: string): string | undefined {
// 	switch (documentType) {
// 		case 'post':
// 			return slug ? `/article/${slug}` : undefined
// 		// case 'page':
// 		// 	return slug ? `/${slug}` : undefined
// 		default:
// 			console.warn('Invalid document type:', documentType)
// 		return undefined
// 	}
// }

export default {
    previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3001/",
        previewMode: {
            enable: "/api/draft-mode/enable",
            disable: "/api/draft-mode/disable",
        },
    },
    allowOrigins: ["http://localhost:*"],
    resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern
        // https://www.sanity.io/docs/visual-editing/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
            {
                route: "/article/:slug",
                filter: `_type == "post" && slug.current == $slug`,
            },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application
        // https://www.sanity.io/docs/visual-editing/presentation-resolver-api#8d8bca7bfcd7
        locations: {
            post: defineLocations({
                select: {
                    title: "title",
                    slug: "slug.current",
                },
                resolve: (doc) => ({
                    locations: [
                        {
                            title: doc?.title ?? "Untitled",
                            href: `/article/${doc?.slug}`,
                        },
                        {
                            title: "Home",
                            href: "/",
                        },
                    ],
                }),
            }),
        }
    },
}