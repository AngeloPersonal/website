import style from "./toc.module.scss"

const HEADING_STYLES = ["h2", "h3", "h4"] as const

function slugify(text: string) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function headingText(block: any): string {
	return (block.children ?? []).map((c: any) => c.text ?? "").join("")
}

export default function TableOfContents({ body }: { body: any[] }) {
	console.log("Body: ", body);

	const headings = (body ?? []).filter(
		(block) => block._type === "block" && HEADING_STYLES.includes(block.style)
	)

	if (headings.length === 0) return null

	return (
		<nav className={style.toc}>
			<p className={style.label}>On this page</p>
			<ol className={style.list}>
				{headings.map((block) => {
					const text = headingText(block)
					return (
						<li key={block._key} data-level={block.style} className={style.item}>
							<a href={`#${slugify(text)}`} className={style.link}>
								{text}
							</a>
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
