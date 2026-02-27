import "server-only"
import type {PortableTextComponents} from "next-sanity"
import CodeBlock from "./code-block"
import LatexBlock from "./latex-block"

export const portableTextComponents: PortableTextComponents = {
	types: {
		code: ({value}) => <CodeBlock value={value} />,
		latex: ({value, isInline}) => <LatexBlock value={value} inline={isInline}/>
	},
}