import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import style from './image.module.scss'

export function ImageBlock({ image }: { image: any }){
	const w = image?.asset?.metadata?.dimensions?.width;
	const h = image?.asset?.metadata?.dimensions?.height;

	console.log("Image: ", image);

	return (
		<div className={style.image}>
			<Image
				src={urlFor(image).width(w).height(h).auto('format').quality(80).url()}
				alt={image.alt||''}
				width={w}
				height={h}
				placeholder={image.asset?.metadata?.lqip ? 'blur' : 'empty'}
				blurDataURL={image.asset?.metadata?.lqip}
			/>
		</div>
	)
}