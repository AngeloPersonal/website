import { defineQuery } from "next-sanity";
// import { draftMode } from "next/headers";
// import { client } from "@/components/sanity/client";
import { Post } from "@local/sanity-studio";
import { sanityFetch } from "@/sanity/lib/live";

const query = defineQuery(`*[
	_type == "post"
	&& slug.current == $slug
][0]{
	_id,
	title,
	slug,
	publishedAt,
	categories,
	body
}`);

type PageProps = {
	params: {
		slug: string;
	};
};

export default async function Page({ params }: PageProps) {
	const { data } = await sanityFetch({query: query, params});
	const post = data as Post | null;

	console.log("Fetched data:", post);

	return post ? (
		<>
			<h1>{post.title}</h1>
			<p>{post._id}</p>
		</>
	) : <h1>Post not found</h1>;
}