import { defineQuery } from "next-sanity";
import { Post } from "@local/sanity-studio";
import { sanityFetch } from "@/sanity/lib/live";
import Article from "@/components/article";

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
	const { data: post } = await sanityFetch({query: query, params});
	return post ? (<Article post={post}/>) : <h1>Post not found</h1>;
}