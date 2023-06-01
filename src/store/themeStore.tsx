import { action, computed, makeObservable, observable } from "mobx";


type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = '@theme';


class ThemeStore {

    themeMode: ThemeMode = localStorage[STORAGE_KEY] || 'light';

    constructor() {
        makeObservable(this, {
            themeMode: observable,
            getThemeMode: computed,
            toggle: action,
            mode: action,
        })
    }

    get getThemeMode() {
        return this.themeMode;
    }
    
    toggle () {
        // console.log('theme toggle called')
        switch (this.themeMode) {
            case 'dark':
                this.themeMode = 'light';
                break;
        
            default:
                this.themeMode = 'dark';
                break;
        }

        localStorage[STORAGE_KEY] = this.themeMode;
    }

    mode(light: string, dark: string) {
        switch (this.themeMode) {
            case 'dark':
                return dark
        
            default:
                return light
        }
    }
    
}

// export const useThemeStore = new ThemeStore();

export default ThemeStore
