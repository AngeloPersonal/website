import "server-only"
import {cache} from "react"
import {codeToHtml} from "shiki"
import type {BundledLanguage, BundledTheme} from "shiki"

export const highlightToHtml = cache(async (
	code: string,
	lang: string,
	theme: BundledTheme,
) => {
	try {
		return await codeToHtml(code, {
			lang: (lang || "text") as BundledLanguage,
			theme,
		})
	} catch {
		return await codeToHtml(code, {
			lang: "text",
			theme,
		})
	}
})