import clsx from 'clsx'
import { selectTheme, switchTheme, ThemeEnum } from '../../../slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import styles from '../style.module.scss'
import DarkIcon from './icon/dark.svg'
import LightIcon from './icon/light.svg'

export default function SwitchTheme() {
	const theme = useAppSelector(selectTheme)
	const dispatch = useAppDispatch()

	const _changeTheme = () => {
		dispatch(switchTheme())
	}
	return (
		<div className={clsx(styles.switchTheme, 'switch-theme margin-right-xs margin-left-xs')}>
			<button onClick={_changeTheme}>{theme === ThemeEnum.DARK ? <LightIcon /> : <DarkIcon />}</button>
		</div>
	)
}
