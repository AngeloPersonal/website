import "server-only"
import {cache} from "react"
import {codeToHtml} from "shiki"
import type {BundledLanguage, BundledTheme} from "shiki"

export const highlightToHtml = cache(async (
	code: string,
	lang: string | undefined,
	themes: {
		light: BundledTheme,
		dark: BundledTheme
	}
) => {
	try {
		return await codeToHtml(code, {
			lang: (lang || "text") as BundledLanguage,
			themes,
			defaultColor: "light",
		})
	} catch {
		return await codeToHtml(code, {
			lang: "text",
			themes,
			defaultColor: "light",
		})
	}
})