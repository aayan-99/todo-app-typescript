// import {  useState } from 'react'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { BaseText } from './BaseText';
import { TaskInterface } from '../../modules/TaskInterface';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';


interface Props {
    task: TaskInterface
}

const DISAPPEAR_CLASS = 'scale-75 -mb-[calc(48px+12px)] opacity-0 z-0'
const DISAPEAR_DELAY = 120;

const TaskItem = ({ task }: Props) => {

    const store = useStore();

    const taskRef = useRef<HTMLDivElement>(null);

    const labelRef = useRef<HTMLDivElement>(null);

    const [isDone, setIsDone] = useState(task?.isDone)

    const [disappear, setDisappear] = useState(true);
    
    const toggleDone = () => {
        const transitionCallback = () => {
            setTimeout(() => {
                disappearFn(() => {
                    store?.task?.toggleDone(task?.id)
                })
            }, DISAPEAR_DELAY);
            labelRef?.current?.removeEventListener('transitionend', transitionCallback, false);
        }
        labelRef?.current?.addEventListener('transitionend', transitionCallback, false);
        setIsDone(!isDone)
    }

    const disappearFn = (callback: Function) => {
        const transitionCallback = () => {
            callback()
            taskRef?.current?.removeEventListener('transitionend', transitionCallback, false);
        }
        taskRef?.current?.addEventListener('transitionend', transitionCallback, false);
        setDisappear(true);
    }

    useEffect(() => {
        setTimeout(() => {
            setDisappear(false);
        }, DISAPEAR_DELAY);
    }, [])


    return (
        <div ref={taskRef} className={`relative ease-in-out duration-300 ${disappear ? DISAPPEAR_CLASS : 'z-[10'}`}>
            <div className='flex items-center px-3 py-4 my-[12px] bg-component dark:bg-component-dark rounded-lg gap-2 shadow-lg'>
                <button onClick={() => {
                    toggleDone()
                }} className='pb-[3px] outline-none'>{!isDone ? <BaseText><CheckBoxOutlineBlankOutlinedIcon fontSize='small' /></BaseText> : <BaseText><CheckBoxOutlinedIcon fontSize='small' /></BaseText>}</button>
                <div className='flex-1 cursor-pointer' onClick={() => {
                    if (isDone) {
                        ''
                    } else {
                        store?.task?.edit(task)
                    }
                }}>
                    <BaseText innerref={labelRef} className={`truncate px-3 inline relative after:content-[''] after:absolute after:top-[50%] after:left-0 after:h-[2px] fter:top-[calc(50%+2px)] after:bg-primary after:ease-in-out after:duration-300 after:transition-width ${isDone ? 'after:w-full' : 'after:w-0'}`}>{task?.title}</BaseText>
                </div>
                <BaseText><button className='text-danger' onClick={() => disappearFn(() => store?.task?.remove(task?.id))}><DeleteOutlinedIcon /></button></BaseText>
            </div>
        </div>
    )
}

export default observer(TaskItem)