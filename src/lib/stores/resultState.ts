import { writable } from 'svelte/store';
import type { ComputeResult } from '../../types';

export const resultState = writable<ComputeResult>({
    result: new Uint8Array(),
    lucky: 0,
})