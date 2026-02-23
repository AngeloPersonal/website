import { Post } from "@local/sanity-studio"
import style from "./article.module.scss"
import { PortableText, PortableTextBlock } from "next-sanity"

type ArticleProps = {
    post: Post
}

export default function Article({ post }: ArticleProps) {

    return (
        <>
            <div className={style.header} style={{ backgroundColor: "red", color: "black" }}>
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
            {/* <p>{post.body}</p> */}
        </>
    )
}