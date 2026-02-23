import { Category, Post } from "@local/sanity-studio"
import style from "./article.module.scss"
import { PortableText, PortableTextBlock } from "next-sanity"

type ArticleProps = {
    post: Post,
    category?: Category
}

export default function Article({ post, category }: ArticleProps) {
    return (
        <>
            <div className={style.header} style={{ backgroundColor: category?.backgroundColor?.hex || "red", color: category?.textColor?.hex || "white" }}>
                <div className={style.headerContent}>
                    <h1>{post.title}</h1>
                    <p>{post.publishedAt}</p>
                </div>
            </div>
            <div className={style.body}>
                {post.body?.length && (
                    <PortableText
                        value={post.body as PortableTextBlock[]}
                    />
                )}
            </div>
        </>
    )
}