import { observer } from 'mobx-react-lite'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useStore } from '../../store';

const ThemeToggle = () => {

    const themeStore = useStore();

    const AFTER_LIGHT_CLASS = 'after:left-[7px]'
    const AFTER_DARK_CLASS = 'after:left-[calc(4px+28px+3px)]'

    const toggleTheme = () => {
        themeStore?.theme?.toggle()
    }

    return (
        <button onClick={toggleTheme} className={`flex items-center gap-[5px] shadow-md text-[18px] px-1 py-[2px] bg-primary text-light rounded-full relative after:content-[''] after:absolute after:bg-light after:h-[18px] after:w-[18px] after:rounded-full after:transition-all after:ease-in-out after:duration-300 ${themeStore?.theme?.themeMode === 'light' ? AFTER_LIGHT_CLASS : AFTER_DARK_CLASS} `}>
            <LightModeIcon fontSize='medium' className='px-[2px]' />
            <DarkModeIcon fontSize='small' className='text-dark' />
        </button>
    )
}

export default observer(ThemeToggle);