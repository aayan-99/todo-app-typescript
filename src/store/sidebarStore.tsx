import { action, makeObservable, observable } from "mobx";


class SidebarStore {
    navToggle: boolean = false;

    navState = 'false'

    constructor() {
        makeObservable(this, {
            navToggle: observable,
            changeNavState: action,
            logAction: action,
        });
    }

    changeNavState = () => {
        // console.log('store function called', this.navToggle)
        this.navToggle = !this.navToggle
        // console.log('store function called after state change', this.navToggle)
    }

    logAction = () => {
        // console.log('second store function called', this.navToggle)
    }

}

export const store = new SidebarStore();

// export default function useSidebarStore () {
//     return new SidebarStore()
// };