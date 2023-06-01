import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../store'
import { BaseText } from './BaseText';

const TaskInput = () => {

    const store = useStore();

    const [title, setTitle] = useState(store?.task?.editTask?.title);

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        if(title) {
            if(store?.task?.editTask) {
                store?.task?.update(store?.task?.editTask?.id, title)
            }else {
                store?.task?.add(title)
            }
            setTitle('')
        }
    }

    useEffect(() => {
        if(store?.task?.editTask) {
            inputRef?.current?.focus();
            setTitle(store?.task?.editTask?.title)
        }
    }, [store?.task?.editTask])


  return (
    <div className='p-3 bg-component dark:bg-component-dark text-dark dark:text-light flex items-center shadow-lg rounded-lg mt-7'>
        <input value={title} onChange={e => setTitle(e?.currentTarget?.value)} onKeyDown={e => e.key === 'Enter' ? submit() : ''} type="text" placeholder='+ add new task' className='bg-transparent outline-0 flex-1 px-3' />
        <button onClick={() => submit()} className='bg-primary px-3 py-1.5 rounded-md text-sm text-light active:scale-95 transition-all duration-300 ease-out'><BaseText>{store?.task?.editTask ? 'Update' : 'Add'}</BaseText></button>
    </div>
  )
}

export default observer(TaskInput)