import clsx from 'clsx'
import { toast } from 'react-toastify'
import { selectTheme, ThemeEnum } from '../../../slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import styles from '../style.module.scss'
import DarkIcon from './icon/dark.svg'
import LightIcon from './icon/light.svg'

export default function SwitchTheme() {
	const theme = useAppSelector(selectTheme)
	const dispatch = useAppDispatch()

	const _changeTheme = () => {
		toast.warn('In Development')
		// dispatch(switchTheme())
	}
	return (
		<div className={clsx(styles.switchTheme, 'margin-right-xs margin-left-xs')}>
			<button onClick={_changeTheme}>{theme === ThemeEnum.DARK ? <LightIcon /> : <DarkIcon />}</button>
		</div>
	)
}
