import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
	type?: 'transparent' | 'white'
	textSize?: 'lg' | '2xl'
	hasText?: boolean
	text?: string
}

export default function Logo({ type = 'white', textSize = '2xl', hasText = true, text = 'Astra Explorer' }: LogoProps) {
	return (
		<Link href="/">
			<div className="link block-center text-bold contrast-color-100">
				<Image alt="Astra Explorer" src={`/images/logo/${type}_logo.svg`} width={48} height={48} />
				{hasText && <span className={`text text-${textSize} text-bold`}>{text}</span>}
			</div>
		</Link>
	)
}
