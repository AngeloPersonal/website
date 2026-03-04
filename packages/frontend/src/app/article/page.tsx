import Link from "next/link"
import { defineQuery, type SanityDocument } from "next-sanity"
import { client } from "@/sanity/lib/client"

const POSTS_QUERY = defineQuery(`*[
	_type == "post"
	&& defined(slug.current)
]|order(publishedAt desc)[0...12]{
	_id,
	title,
	slug,
	publishedAt,
	mainImage {
		alt,
		caption,
		crop,
		hotspot,
		asset->{
			_id,
			url,
			metadata{
				dimensions{width,height,aspectRatio},
				lqip
			}
		}
	}
}`);

const options = { next: { revalidate: 30 } }

export default async function Page() {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

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