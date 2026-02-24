import { PortableText, PortableTextBlock } from "next-sanity"
import { portableTextComponents } from "@/components/text"
import { Author, Category, Post } from "@local/sanity-studio"
import style from "./article.module.scss"
import SuggestedArticles from "./suggestions"
import Link from "next/link"

type ArticleProps = {
    post: Post,
    category?: Category,
    author?: Author
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const endings = [...["th"], ...["st", "nd", "rd"], ...Array(6).fill("th")]

export default function Article({ post, category, author }: ArticleProps) {
    const date = new Date(post.publishedAt || 0);

    return (
        <>
            <div className={style.header} style={{ backgroundColor: category?.backgroundColor?.hex || "red", color: category?.textColor?.hex || "white" }}>
                <div className={style.headerContent}>
                    <div className={style.category}>
                        <Link href={"/"}>Articles &gt; </Link> 
                        <Link href={`/articles?category=${category?.title || "uncategorized"}`}>
                            {category?.title || "Uncategorized"}
                        </Link>
                        </div>
                    <h1>{post.title}</h1>
                    <div>
                        {/* TODO: Avatar */}
                        Written on {months[date.getMonth()]} {date.getDate()}{endings[date.getDate() % 10]} {date.getFullYear()} by {author?.name || "Unknown author"}
                    </div>
                </div>
            </div>
            <div className={style.body}>
                {post.body?.length && (
                    <PortableText
                        value={post.body as PortableTextBlock[]}
                        components={portableTextComponents}
                    />
                )}
            </div>
            <SuggestedArticles/>
        </>
    )
}