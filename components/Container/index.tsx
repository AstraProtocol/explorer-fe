import clsx from 'clsx'

type ContainerProps = {
	classes?: string[]
	children: React.ReactNode
}

export default function Container({ children, classes = [] }: ContainerProps) {
	return <div className={clsx('container margin-auto', ...classes)}>{children}</div>
}
