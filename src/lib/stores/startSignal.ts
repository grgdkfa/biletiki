import { writable } from 'svelte/store';
import type { ComputeParams } from '../../types';

export const startSignal = writable<ComputeParams>({
    left: '',
    right: '',
    showGradients: false,
    highlightLucky: false,
})