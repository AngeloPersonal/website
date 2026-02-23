import Link from "next/link"
import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import { Post } from "@local/sanity-studio"

const POST_QUERY = `*[
	_type == "post"
	&& slug.current == $slug
][0]{
	_id,
	title,
	slug,
	publishedAt
}`

const options = { next: { revalidate: 30 } }

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = await client.fetch<Post>(POST_QUERY, { slug }, options)

	console.log("Post:", post)

	return (
		<main>
			<h1>{post.title}</h1>
			<p>{post.publishedAt}</p>
		</main>
	)
}