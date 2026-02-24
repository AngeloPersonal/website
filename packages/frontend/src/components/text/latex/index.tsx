import "server-only"

import { Latex } from "@local/sanity-studio"
import katex from "katex"
import style from "../text.module.css"
import "katex/dist/katex.min.css"

function stripDelimiters(input: string) {
	return input
		.replace(/^\s*\$\$(.*)\$\$\s*$/s, "$1")
		.replace(/^\s*\\\((.*)\\\)\s*$/s, "$1")
		.replace(/^\s*\\\[(.*)\\\]\s*$/s, "$1")
}

export default function LatexBlock({ value } : { value: Latex }) {
    const latex = stripDelimiters(value?.body ?? "")
    const html = katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        strict: "warn",
    })

    return (
        <div
            className={style.block}
            dangerouslySetInnerHTML={{__html: html}}
        />
    )
}