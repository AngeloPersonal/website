import "server-only"
import type {PortableTextComponents} from "next-sanity"
import { toPlainText } from "next-sanity"
import CodeBlock from "./code-block"
import LatexBlock from "./latex-block"
import { ImageBlock } from "./image-block"

function slugify(text: string) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export const portableTextComponents: PortableTextComponents = {
	types: {
		code: ({value}) => <CodeBlock value={value} />,
		latex: ({value, isInline}) => <LatexBlock value={value} inline={isInline} />,
		image: ({value}) => <ImageBlock image={value} />,
	},
	block: {
		h2: ({value, children}) => <h2 id={slugify(toPlainText(value))}>{children}</h2>,
		h3: ({value, children}) => <h3 id={slugify(toPlainText(value))}>{children}</h3>,
		h4: ({value, children}) => <h4 id={slugify(toPlainText(value))}>{children}</h4>,
	},
}