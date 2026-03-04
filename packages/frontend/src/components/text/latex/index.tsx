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

export default function LatexBlock({ value, isInline } : { value: Latex, isInline: boolean }) {
    const latex = stripDelimiters(value?.body ?? "")
    const html = katex.renderToString(latex, {
        displayMode: !isInline,
        throwOnError: false,
        strict: "ignore",
    })

    if (isInline) {
        return <span dangerouslySetInnerHTML={{__html: html}} />
    }

    return (
        <div
            className={style.block}
            dangerouslySetInnerHTML={{__html: html}}
        />
    )
}