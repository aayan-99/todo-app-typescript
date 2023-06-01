import { useEffect } from 'react'
import Sidebar from './components/global-components/Sidebar'
import { observer } from 'mobx-react-lite';
import LandingPage from './pages/LandingPage';
import { store } from './store/sidebarStore';
import { useStore } from './store';

function App() {
  
  const themeStore = useStore();


  useEffect(() => {
    document.body.setAttribute('data-mode', themeStore?.theme?.themeMode)
  }, [themeStore?.theme?.themeMode])


  return (
    <div className='w-full relative bg-light dark:bg-dark'>
      <Sidebar store={store} />
      
      <div className={`transition-all duration-300 ease-out ${store?.navToggle ? 'pl-[300px]' : 'pl-0'}`}>
      <LandingPage/>
      </div>
    </div>
  )
}

export default observer(App)
