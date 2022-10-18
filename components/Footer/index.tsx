import clsx from 'clsx'
import Container from '../Container'
import Logo from '../Logo'
import FooterLink from './FooterLink'
import FooterSocial from './FooterSocial'

import styles from './style.module.scss'

export default function Footer() {
	return (
		<footer className={clsx(styles.footer, 'padding-top-xl padding-bottom-xl margin-top-2xl md-padding-lg')}>
			<Container>
				<div className={styles.footerLogo}>
					<Logo type="transparent" textSize="2xl" />
				</div>
				<div className={clsx(styles.footerInfo, 'row md-wrap margin-top-md md-margin-top-0')}>
					<FooterLink classes="col-9 md-full gutter-right" />
					<FooterSocial classes="col-3 md-full md-margin-top-xl" />
				</div>
			</Container>
		</footer>
	)
}
