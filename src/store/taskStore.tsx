import { action, computed, makeObservable, observable } from "mobx";
import { TaskInterface } from "../modules/TaskInterface";


const STORAGE_KEY = '@tasks';

class TaskStore {

    tasks: TaskInterface[] = []

    editTaskValue?: TaskInterface

    constructor() {
        // this.fetchs()
        makeObservable(this, {
            tasks: observable,
            getTasks: computed,
            completedTasks: computed,
            add: action,
            update: action,
            remove: action,
            toggleDone: action,
            editTaskValue: observable,
            editTask: computed,
        })
    }

    protected fetchs() {
        this.tasks = JSON.parse(localStorage[STORAGE_KEY])
    }

    protected sync() {
        localStorage[STORAGE_KEY] = JSON.stringify(this.tasks)
    }


    get getTasks() {
        return this.tasks?.filter((task) => !task?.isDone)?.sort((a, b) => b?.updatedAt - a?.updatedAt);
    }

    get completedTasks() {
        return this.tasks?.filter((task) => task?.isDone)?.sort((a, b) => b?.updatedAt - a?.updatedAt);
    }

    get editTask() {
        return this.editTaskValue
    }

    protected generateId(): number {
        let rand = Math.random()

        while(this.tasks.find(task => task.id === rand)) {
            rand = Math.random()
        }

        return rand
    }

    add(title: string) {
        this.tasks?.push({
            title,
            id: this.generateId(),
            isDone: false,
            updatedAt: new Date().getTime(),
        })
    }

    edit(task: TaskInterface) {
        // console.log('edit function called')
        this.editTaskValue = task
        // console.log(this.editTaskValue?.title)
    }

    protected find(id: TaskInterface['id'], callback: (task: TaskInterface, index: number) => void) {
        const index = this.tasks.findIndex((task) => task.id === id)

        if (index !== -1) {
            callback(this.tasks[index], index)
        }
    }

    update(id: TaskInterface['id'], title: string) {
        this.find(id, (task, i) => {
            this.tasks[i] = {
                ...task,
                title,
            }
            this.editTaskValue = undefined
            this.sync()
        })
    }

    remove(id: TaskInterface['id']) {
        this.find(id, (_, i) => {
            this.tasks.splice(i, 1)
            this.sync()
        })
    }

    toggleDone(id: TaskInterface['id']) {
        this.find(id, (task, i) => {
            this.tasks[i] = {
                ...task,
                isDone: !task.isDone,
                // update when completed only, show task show in first
                updatedAt: !task.isDone ? new Date().getTime() : task.updatedAt
            }

            this.sync()
        })
    }
}

export default TaskStore