import ThemeToggle from '../components/individual-components/ThemeToggle';
import TaskList from '../components/individual-components/TaskList';
import TaskInput from '../components/individual-components/TaskInput';




const LandingPage: React.FC =  () => {

    return (
        <div className='w-full h-screen relative'>
            {/* <div className={`w-[30px] h-[30px] rounded-full absolute top-[27px] right-[30px] cursor-pointer bg-red-500`} onClick={sidebarToggle}>
            </div> */}
            <div className='w-[60%] mx-auto'>
                <div className='w-full flex justify-between items-center p-5 pt-[30px]'>
                    <div className=''>
                        <h1 className='text-3xl font-[600] text-primary'>ToDo</h1>
                    </div>
                    <div className=''>
                        <ThemeToggle></ThemeToggle>
                    </div>
                </div>
                <TaskInput/>
                <TaskList></TaskList>
            </div>
        </div>
    )
}

export default LandingPage