import "server-only"
import type {PortableTextComponents} from "next-sanity"
import CodeBlock from "./code-block"
import LatexBlock from "./latex"

export const portableTextComponents: PortableTextComponents = {
	types: {
		code: ({value}) => <CodeBlock value={value} />,
		latex: ({value}) => <LatexBlock value={value} />
	},
}