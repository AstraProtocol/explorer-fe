type ContainerProps = {
	children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
	return <div className="container margin-auto">{children}</div>
}
