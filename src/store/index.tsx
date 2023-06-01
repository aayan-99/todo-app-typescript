import { createContext, useContext } from 'react'

// import { Task } from './task'
import ThemeStore from './themeStore'
import TaskStore from './taskStore'

const ctx = createContext({
    theme: new ThemeStore(),
    task: new TaskStore(),
})

export const useStore = () => useContext(ctx)