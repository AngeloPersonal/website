import "server-only"

import { Latex } from "@local/sanity-studio"
import katex from "katex"
import style from "../text.module.css"
import "katex/dist/katex.min.css"

type LatexBlockTypes = {
    value: Latex; 
    inline: boolean;
}

export default function LatexBlock({ value, inline } : LatexBlockTypes) {
    if (!value.body) { return ""; }

    const latex = value?.body;

    const html = katex.renderToString(latex, {
        displayMode: !inline,
        throwOnError: false,
        strict: "ignore",
    })

    const Tag = inline ? "span" : "div";

    return (
        <Tag
            className={inline ? undefined : style.block}
            dangerouslySetInnerHTML={{__html: html}}
        />
    )
}