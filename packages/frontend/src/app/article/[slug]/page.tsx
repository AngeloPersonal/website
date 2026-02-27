import { defineQuery } from "next-sanity";
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
	author->{
		_id,
		name
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

	return post ? (
		<Article 
			post={post} 
			category={post.category}
			author={post.author}
		/>
	) : <h1>Post not found</h1>;
}