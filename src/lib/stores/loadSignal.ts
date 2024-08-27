import { writable } from "svelte/store";
import type { LoadSignal } from "../../types";

export const loadSignal = writable<LoadSignal>({
    l: 'a+b+c',
    r: 'x+y+z',
})