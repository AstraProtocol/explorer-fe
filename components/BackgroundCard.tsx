import React from 'react'

interface Props {
	children: React.ReactElement
}

const BackgroundCard = ({ children }: Props) => {
	return (
		<div className="background-card">
			{children}
			<style jsx>{`
				.background-card {
					box-sizing: border-box;

					/* Auto layout */

					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: 24px 0px;

					width: 1272px;
					height: 528px;

					/* White Color/50 */

					background: rgba(255, 255, 255, 0.05);
					/* White Color/50 */

					border: 1px solid rgba(255, 255, 255, 0.05);
					backdrop-filter: blur(42px);
					/* Note: backdrop-filter has minimal browser support */

					border-radius: 16px;

					/* Inside auto layout */

					flex: none;
					order: 0;
					flex-grow: 0;
				}
			`}</style>
		</div>
	)
}

export default BackgroundCard
