import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "@/components/sanity/client";
import { Post } from "@local/sanity-studio";

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

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { isEnabled } = await draftMode();

	const data = await client.fetch<Post>(
		query,
		{ slug },
		isEnabled
			? {
				perspective: "drafts",
				useCdn: false,
				stega: true,
			}
			: undefined
	);

	console.log("Fetched data:", data);

	return data ? (
		<>
			<h1>{data.title}</h1>
			<p>{data._id}</p>
		</>
	) : <h1>Post not found</h1>;
}