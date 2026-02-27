import { sanityFetch } from "@/sanity/lib/live"
import style from "../article.module.scss"
import { defineQuery } from "next-sanity";
import { Post } from "@local/sanity-studio";

const RECENT_POSTS_QUERY = defineQuery(`*[
	_type == "post"
	&& defined(slug.current)
	&& _id != $currentId
]|order(publishedAt desc, _createdAt desc)[0...4]{
	_id,
	title,
	slug,
	publishedAt,
    description,
	category->{
		title
	},
}`);

const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export default async function SuggestedArticles({ currentId }: { currentId: string }) {
    const articles = await sanityFetch({ query: RECENT_POSTS_QUERY, params: { currentId } });

    return (
        <div className={style.wrapper}>
            <h2>Recommended Reads</h2>
            <div className={style.suggested}>
                {articles.data?.map((article: any) => (
                    <a key={article.slug.current} href={`/article/${article.slug.current}`} className={style.link}>
                        <div className={style.post}>
                            <div className={style.text}>
                                {article.title}
                            </div>
                            <span className={style.tag}>{article.category?.title || "Uncategorized"}</span>
                        </div>
                        <div className={ style.description }>
                            { article.description || placeholder }
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}