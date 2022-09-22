import clsx from 'clsx'
import Image from 'next/image'
import styles from './style.module.scss'

const socialItems = [
	{
		icon: '/images/socials/twitter.png',
		link: '/#'
	},
	{
		icon: '/images/socials/facebook.png',
		link: '/#'
	},
	{
		icon: '/images/socials/youtube.png',
		link: '/#'
	},
	{
		icon: '/images/socials/medium.png',
		link: '/#'
	},
	{
		icon: '/images/socials/tele.png',
		link: '/#'
	}
]

type FooterSocialProps = {
	classes?: string
}

export default function FooterSocial({ classes }: FooterSocialProps) {
	return (
		<div className={clsx(styles.footerSocial, classes)}>
			<div className="margin-bottom-md text text-base text-bold">Connect with us</div>
			<div>
				{socialItems.map(item => (
					<a key={item.icon} href={item.link} className="margin-right-sm">
						<Image src={item.icon} width={32} height={32} />
					</a>
				))}
			</div>
		</div>
	)
}
