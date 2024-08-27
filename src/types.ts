
export interface LoadSignal {
    l: string;
    r: string;
}

export interface ComputeParams {
    left: string;
    right: string;
    showGradients: boolean;
    highlightLucky: boolean;
}

export interface ComputeResult {
    lucky: number;
    result: Uint8Array;
}

export interface WorkerProgressMessage {
    message: 'progress';
    progress: number;
}

export interface WorkerResultMessage extends ComputeResult {
    message: 'result';
}

export interface WorkerErrorMessage {
    message: 'error';
    error: string;
}

export type WorkerMessage = WorkerProgressMessage | WorkerResultMessage | WorkerErrorMessage;