import Image from 'next/image'

type LogoProps = {
	type?: 'transparent' | 'white'
	textSize?: 'lg' | '2xl'
}

export default function Logo({ type = 'white', textSize = '2xl' }: LogoProps) {
	return (
		<a href="/" className=" link block-center text-bold contrast-color-100">
			<Image src={`/images/logo/${type}_logo.svg`} width={48} height={48} />
			<span className={`text text-${textSize}`}>Astra Protocol</span>
		</a>
	)
}
