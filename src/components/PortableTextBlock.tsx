// components/PortableTextBlock.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-md leading-relaxed mb-4 text-bleu/90">{children}</p>,
  },
}

export default function PortableTextBlock({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
