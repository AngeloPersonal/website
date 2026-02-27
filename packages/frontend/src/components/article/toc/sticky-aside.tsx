'use client'

import { useEffect, useRef } from 'react'

const TOP_OFFSET = 32 // 2rem

export default function StickyAside({ children, className }: { children: React.ReactNode, className?: string }) {
	const asideRef = useRef<HTMLElement>(null)
	const innerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const aside = asideRef.current
		const inner = innerRef.current
		if (!aside || !inner) return

		const update = () => {
			const bodyWrapper = aside.parentElement
			if (!bodyWrapper) return

			const asideTop = aside.getBoundingClientRect().top
			const bodyWrapperBottom = bodyWrapper.getBoundingClientRect().bottom
			const innerHeight = inner.offsetHeight

			if (asideTop > TOP_OFFSET) {
				// Not yet scrolled past — normal flow
				inner.style.position = ''
				inner.style.top = ''
				inner.style.width = ''
			} else if (bodyWrapperBottom - innerHeight <= TOP_OFFSET) {
				// Would go below body — pin to bottom of aside
				inner.style.position = 'absolute'
				inner.style.top = `${aside.offsetHeight - innerHeight}px`
				inner.style.width = `${aside.offsetWidth}px`
			} else {
				// Fixed to viewport top
				inner.style.position = 'fixed'
				inner.style.top = `${TOP_OFFSET}px`
				inner.style.width = `${aside.offsetWidth}px`
			}
		}

		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)
		update()

		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [])

	return (
		<aside ref={asideRef} className={className} style={{ position: 'relative' }}>
			<div ref={innerRef}>
				{children}
			</div>
		</aside>
	)
}
