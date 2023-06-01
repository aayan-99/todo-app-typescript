import { observer } from 'mobx-react-lite'


interface Props {
  store: any
}



const Sidebar = ({ store }: Props) => {

  const sidebarClose = () => {
    // console.log('sidebar close button called')
    store?.changeNavState()
  };


  return (
    <div className={` h-screen fixed bg-blue-400 overflow-hidden transition-all duration-300 ease-out ${store?.navToggle ? 'w-[300px]' : 'w-0'}`}>
      <div>
        <button className='cursor-pointer p-1 z-[500] bg-red-500 mt-10 ml-10' onClick={sidebarClose}>close</button>
        <button className='border rounded-[8px] p-1 ml-4 cursor-pointer'>demo</button>
      </div>
    </div>
  )
}

export default observer(Sidebar)

