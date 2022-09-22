import clsx from 'clsx'
import React, { ReactNode } from 'react'
import CopyButton from './Button/CopyButton'
import BackgroundCard from './Card/Background/BackgroundCard'
import Navbar from './Navbar'
import BackgroundRow from './Row/BackgroundRow'
import GradientRow from './Row/GradientRow'
import Tabs from './Tabs/Tabs'
import Typography from './Typography'

type Props = {
	children: ReactNode
}

const Layout: React.FC<Props> = props => (
	<div className={clsx('dark--mode', 'local')}>
		<Navbar />
		<BackgroundCard>
			<Tabs
				tabs={[
					{ title: 'Tab 1', value: '1' },
					{ title: 'Tab 2', value: '2' }
				]}
				contents={{
					'1': <div>Hello World</div>
				}}
			></Tabs>
		</BackgroundCard>
		<CopyButton text="0x12341231" onClick={() => {}} />
		<div />
		<CopyButton
			text={<Typography.LinkText href="https://google.com">hihihi</Typography.LinkText>}
			onClick={() => {}}
		/>
		<div />
		<Typography.PageTitle icon="copy-icon">Test</Typography.PageTitle>
		<div />
		<Typography.SuccessText icon="success">Sucess</Typography.SuccessText>
		<div />
		<Typography.PageTitle>Test</Typography.PageTitle>
		<div />
		<Typography.CardLabel>Transaction Hash:</Typography.CardLabel>
		<div />
		<Typography.LinkText href="https://google.com">0x141CC5ce4A7267861fC1c50C416C31617fcaCEC0</Typography.LinkText>
		<div />
		<Typography.PrimaryText>Transaction</Typography.PrimaryText>
		<div />
		<Typography.SecondaryText>Type</Typography.SecondaryText>
		<div />
		<Typography.SuccessText>Success</Typography.SuccessText>
		<div />
		<Typography.ErrorText>Error</Typography.ErrorText>
		<div />
		<BackgroundCard>
			<h1>afsdfasdf</h1>
		</BackgroundCard>
		<GradientRow type="success">
			<span>f</span>
			<span>g</span>
		</GradientRow>
		<GradientRow type="error">
			<span>f</span>
			<span>g</span>
		</GradientRow>
		<BackgroundRow>
			<span>f</span>
			<span>g</span>
		</BackgroundRow>
		<div className="layout" style={{ height: '200vh' }}>
			{props.children}
		</div>
		<style jsx>{`
			.local {
				padding-left: 16px;
				color: white;
				background: radial-gradient(
							106.61% 108.18% at 0% 100%,
							rgba(82, 120, 255, 0.2) 0%,
							rgba(0, 0, 0, 0) 100%
						)
						/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
					#08080a;
			}
		`}</style>
	</div>
)

export default Layout
