import { writable } from 'svelte/store';

export interface AppState {
    isComputing: boolean,
    progress: number,
    error?: string,
}

export const appState = writable<AppState>({
    isComputing: false,
    progress: 50
})