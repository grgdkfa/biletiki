<script lang="ts">
  import { Styles, Container } from '@sveltestrap/sveltestrap';

  import FormulaInputs from './lib/FormulaInputs.svelte';
  import Progress from './lib/Progress.svelte';
  import MainCanvas from './lib/MainCanvas.svelte';
  import Stats from './lib/Stats.svelte';

  import { appState } from './lib/stores/appState';
  import { resultState } from './lib/stores/resultState';
  import { startSignal } from './lib/stores/startSignal';
  import type { ComputeParams, WorkerMessage } from './types';
  import ErrorMessage from './lib/ErrorMessage.svelte';
  import Header from './lib/Header.svelte';

  export let worker: Worker;

  worker.onmessage = (ev: MessageEvent<WorkerMessage>) => {
    const message = ev.data;
    if (message.message === 'error') {
      appState.set({
        isComputing: false,
        progress: 0,
        error: message.error,
      });
    }
    if (message.message === 'progress') {
      appState.set({
        isComputing: true,
        progress: message.progress,
      });
    }
    if (message.message === 'result') {
      appState.set({
        isComputing: false,
        progress: 0,
      });
      resultState.set({
        lucky: message.lucky,
        result: message.result,
      });
    }
  }

  worker.onerror = (ev) => {
    appState.set({
      isComputing: false,
      progress: 0,
      error: ev.message,
    });
  }

  startSignal.subscribe(signal => {
    if (signal.left === '' || signal.right === '') {
      return;
    }
    worker.postMessage(<ComputeParams>{
      left: signal.left,
      right: signal.right,
      showGradients: signal.showGradients,
      highlightLucky: signal.highlightLucky,
    });
  });
</script>

<Styles></Styles>
<Header></Header>
<Container lg>
  <FormulaInputs></FormulaInputs>
  {#if $appState.error}
    <ErrorMessage></ErrorMessage>
  {/if}
  {#if $appState.isComputing}
    <Progress></Progress>
  {/if}
  {#if !$appState.isComputing && $resultState.result.length > 0}
    <Stats></Stats>
  {/if}
  <MainCanvas></MainCanvas>
</Container>