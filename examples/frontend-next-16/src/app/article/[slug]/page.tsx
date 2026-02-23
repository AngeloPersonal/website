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
	category->{
		_id,
		title,
		textColor,
		backgroundColor
	},
	body
}`);

type PageProps = {
	params: {
		slug: string;
	};
};

export default async function Page({ params }: PageProps) {
	const { data: post } = await sanityFetch({query: query, params});

	console.log(post.category);

	return post ? (
		<Article 
			post={post} 
			category={post.category}
		/>
	) : <h1>Post not found</h1>;
}