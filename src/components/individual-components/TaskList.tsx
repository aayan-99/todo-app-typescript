import TaskItem from './TaskItem'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { BaseText } from './BaseText'

const TaskList = () => {

    const store = useStore();


  return (
    <div className='mt-6'>
        {
            store?.task?.getTasks?.map((task) => (
                <TaskItem key={task?.id} task={task} />
            ))
        }
        <div className='py-3'>
            <BaseText className='p-3'>Completed ({store?.task?.completedTasks?.length})</BaseText>
        </div>
        {
            store?.task?.completedTasks?.map((task) => (
                <TaskItem key={task?.id} task={task} />
            ))
        }
    </div>
  )
}

export default observer(TaskList)