import "server-only"

import type { BundledTheme } from 'shiki'
import { codeToHtml } from 'shiki'
import { Code } from "@local/sanity-studio"
import style from "./code.module.css"

type Props = {
	value: Code
	theme?: {
		light: BundledTheme,
		dark: BundledTheme,
	}
}

export default async function CodeBlock({
	value, 
	theme = {
		light: "catppuccin-latte",
		dark: "github-dark-default",
	}
}: 
	Props
) {
	const out = await codeToHtml(value.code ?? "", {
		lang: value.language ?? "text",
		themes: theme,
		defaultColor: "light",
	})

	return (
		<div className={style.codeBlock} >
			{ value.filename && (
				<div>
					{value.filename}
				</div>
			)}
			<span className={style.lang}>{value.language}</span>
			<div dangerouslySetInnerHTML={{ __html: out }} />
		</div>
	)
}