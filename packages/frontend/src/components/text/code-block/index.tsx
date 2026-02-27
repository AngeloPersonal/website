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
	// TODO: Better error handling
	const out = await codeToHtml(value.code ?? "", {
		lang: value.language ?? "text",
		themes: theme,
		defaultColor: "light",
	}).catch((e) => {
		return codeToHtml(value.code ?? "ERROR", {
			lang: "text",
			themes: theme,
			defaultColor: "light"
		})
	})

	return (
		<div className={style.codeBlock} >
			{ value.filename && (
				<div>
					{value.filename}
				</div>
			)}
			<button className={style.copy}></button>
			<span className={style.lang}>{value.language}</span>
			<div dangerouslySetInnerHTML={{ __html: out }} />
		</div>
	)
}