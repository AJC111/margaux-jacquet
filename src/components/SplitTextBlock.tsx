'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'motion'
import { splitText } from 'motion-plus'

type Props = {
  as?: 'p' | 'h1' | 'h2' | 'div' | 'blockquote'
  text: string
  className?: string
}

export default function SplitTextBlock({ as = 'p', text, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return
      containerRef.current.style.visibility = 'visible'

      const el = containerRef.current.querySelector('[data-split]') as HTMLElement
      const { words } = splitText(el, { wordClass: 'split-word' })

      animate(
        words,
        { opacity: [0, 1], y: [8, 0] },
        {
          duration: 1.5,
          delay: stagger(0.04),
          type: 'spring',
          bounce: 0.2,
        }
      )
    })
  }, [])

  const Tag = as

  return (
    <div ref={containerRef} style={{ visibility: 'hidden' }}>
      <Tag className={className} data-split>
        {text}
      </Tag>
      <style>{`
        .split-word {
          display: inline-block;
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  )
}
