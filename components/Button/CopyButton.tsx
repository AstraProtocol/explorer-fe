interface Props {
	text: JSX.Element | string
	onClick: any
}

const CopyButton = ({ text, onClick }: Props) => {
	return (
		<>
			{text}
			<a onClick={onClick} className="money money-sm copy-icon sm-margin-left-xs" />
		</>
	)
}

export default CopyButton
