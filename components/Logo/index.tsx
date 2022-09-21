import Image from 'next/image'

type LogoProps = {
	type?: 'transparent' | 'white'
}

export default function Logo({ type = 'white' }: LogoProps) {
	return (
		<div className='block-center text-bold contrast-color-100'>
			<Image src={`/images/logo/${type}_logo.svg`} width={48} height={48} />
			Astra Protocol
		</div>
	)
}
