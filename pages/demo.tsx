import Container from 'components/Container'
import Table, { TableDataSource } from 'components/Table/Table'
import React, { ReactNode } from 'react'
import CopyButton from '../components/Button/CopyButton'
import BackgroundCard from '../components/Card/Background/BackgroundCard'
import Layout from '../components/Layout'
import BackgroundRow from '../components/Row/BackgroundRow'
import GradientRow from '../components/Row/GradientRow'
import Tabs from '../components/Tabs/Tabs'
import Typography from '../components/Typography'

type Props = {
	children: ReactNode
}

const tableData = [
	{
		x: 1,
		y: 2
	},
	{
		x: 2,
		y: 2
	},
	{
		x: 3,
		y: 2
	}
]

const dataSource: TableDataSource[] = [
	{
		dataIndex: 'xxx',
		key: 'xxx',
		render: (v, r, index) => index + 1,
		title: 'STT'
	},
	{
		dataIndex: 'x',
		key: 'x',
		render: v => <span>{v}</span>,
		title: 'Test X'
	},
	{
		dataIndex: 'y',
		key: 'y',
		render: v => <span style={{ color: 'red' }}>{v} </span>,
		title: 'Test Y'
	}
]

const DemoPage: React.FC<Props> = props => (
	<Layout>
		<Container>
			<Table title="Demo Table" rowKey="x" dataSource={dataSource} data={tableData} />
			<br />
			<Table title="Demo Table" inverted rowKey="x" dataSource={dataSource} data={tableData} />
			<br />
			<BackgroundCard>
				<Tabs
					tabs={[
						{ title: 'Tab 1', id: '1' },
						{ title: 'Tab 2', id: '2' }
					]}
					contents={{
						'1': <div>Hello World</div>
					}}
				></Tabs>
			</BackgroundCard>
			<CopyButton textCopy="0x1asdfasdfa2341231" textTitle={'0x...123123'} />
			<div />
			<CopyButton
				textCopy="alsdkfjalkdsfjlakds"
				textTitle={<Typography.LinkText href="https://google.com">hihihi</Typography.LinkText>}
			/>
			<CopyButton textCopy="alsdkfjalkdsfjlakds" />
			<div />
			<Typography.PageTitle icon="copy-icon">Test</Typography.PageTitle>
			<div />
			<Typography.SuccessText icon="success">Sucess</Typography.SuccessText>
			<div />
			<Typography.PageTitle>Test</Typography.PageTitle>
			<div />
			<Typography.CardLabel>Transaction Hash:</Typography.CardLabel>
			<div />
			<Typography.LinkText href="https://google.com">
				0x141CC5ce4A7267861fC1c50C416C31617fcaCEC0
			</Typography.LinkText>
			<div />
			<Typography.PrimaryText>Transaction</Typography.PrimaryText>
			<div />
			<Typography.SecondaryText>Type</Typography.SecondaryText>
			<div />
			<Typography.SuccessText>Success</Typography.SuccessText>
			<div />
			<Typography.ErrorText>Error</Typography.ErrorText>
			<div />
			<Typography.PageTitle>Typography.Time Component</Typography.PageTitle>
			<div />
			<Typography.Time time={new Date().getTime()} />
			<div />
			<Typography.Time time={new Date().getTime()} confirmedWithin="2.344ss" />
			<div />
			<Typography.Label text="Confirmed by 25,886" backgroundShape="specialShape" />
			<Typography.Label text="Confirmed" backgroundShape="rectangle" type="error" />
			<Typography.Label text="Confirmed" backgroundShape="rectangle" type="success" />
			<Typography.Label text="Success" type="success" />
			<Typography.Label text="Success" type="success" icon />
			<Typography.Label text="Error" type="error" icon />
			<div />
			<div />
			<BackgroundCard>
				<h1>afsdfasdf BackgroundCard</h1>
			</BackgroundCard>
			<GradientRow type="success">
				<span>f GradientRow</span>
				<span>g GradientRow</span>
			</GradientRow>
			<GradientRow type="error">
				<span>f GradientRow</span>
				<span>g GradientRow</span>
			</GradientRow>
			<BackgroundRow>
				<span>f BackgroundRow</span>
				<span>g BackgroundRow</span>
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
		</Container>
	</Layout>
)

export default DemoPage
