import Link from "next/link"
import { type SanityDocument } from "next-sanity"
import { client } from "@/components/sanity/client"

const POSTS_QUERY = `*[
	_type == "post"
	&& defined(slug.current)
]|order(publishedAt desc)[0...12]{
	_id,
	title,
	slug,
	publishedAt
}`

const options = { next: { revalidate: 30 } }

export default async function Home() {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

  console.log("Fetched posts:", posts)

	return (
		<main>
			<h1>Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post._id}>
						<Link href={`/article/${post.slug.current}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</main>
	)
}