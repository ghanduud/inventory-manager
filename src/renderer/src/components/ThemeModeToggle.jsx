import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { useThemeMode } from '../context/ThemeModeContext';

function ThemeModeToggle() {
	const { isLightMode, toggleThemeMode } = useThemeMode();

	return (
		<ButtonIcon onClick={toggleThemeMode}>{isLightMode ? <HiOutlineMoon /> : <HiOutlineSun />}</ButtonIcon>
	);
}

export default ThemeModeToggle;
