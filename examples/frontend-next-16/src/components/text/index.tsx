import "server-only"
import type {PortableTextComponents} from "next-sanity"
import CodeBlock from "./code-block"

export const portableTextComponents: PortableTextComponents = {
	types: {
		code: ({value}) => <CodeBlock value={value as any} />,
	},
}