import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import style from './image.module.scss'

export function ImageBlock({ image }: { image: any }){
	const w = image.width || 1200;
	const ar = image?.asset?.metadata?.dimensions?.aspectRatio || 1;
	const h = Math.round(w/ar);

	return (
		<Image
			src={urlFor(image).width(w).height(h).auto('format').quality(80).url()}
			className={style.image}
			alt={image.alt||''}
			width={w}
			height={h}
			placeholder={image.asset?.metadata?.lqip ? 'blur' : 'empty'}
			blurDataURL={image.asset?.metadata?.lqip}
		/>
	)
}