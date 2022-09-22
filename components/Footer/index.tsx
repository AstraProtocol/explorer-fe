import clsx from 'clsx'
import Container from '../Container'
import Logo from '../Logo'
import FooterLink from './FooterLink'
import FooterSocial from './FooterSocial'

import styles from './style.module.scss'

export default function Footer() {
	return (
		<footer className={clsx(styles.footer, 'padding-top-xl padding-bottom-xl')}>
			<Container>
				<div className={styles.footerLogo}>
					<Logo type="white" textSize="lg" />
				</div>
				<div className={clsx(styles.footerInfo, 'row')}>
					<FooterLink classes="col col-9 gutter-right" />
					<FooterSocial classes="col col-3" />
				</div>
			</Container>
		</footer>
	)
}
