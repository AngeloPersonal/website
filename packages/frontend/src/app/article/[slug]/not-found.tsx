import { sanityFetch } from "@/sanity/lib/live";
import Article from "@/components/article";

export default async function NotFound() {
	return (
        <h2>404 Not Found</h2>
		// <Article 
		// 	post={{
        //         _id: '0',

        //     }} 
		// 	category={{ title: 'error' }}
		// 	author={post.author}
		// />
	)
}