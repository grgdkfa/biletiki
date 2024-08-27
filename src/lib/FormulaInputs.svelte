<script lang="ts">
    import { Button, Input, InputGroup, InputGroupText } from '@sveltestrap/sveltestrap';
    import { appState } from './stores/appState';
    import { startSignal } from './stores/startSignal';
    import { loadSignal } from './stores/loadSignal';

    let leftFormula: string;
    let rightFormula: string;
    let showGradients: boolean;
    let highlightLucky: boolean;

    loadSignal.subscribe(signal => {
        leftFormula = signal.l;
        rightFormula = signal.r;
    })

    function start() {
        startSignal.set({
            left: leftFormula,
            right: rightFormula,
            showGradients,
            highlightLucky,
        });
        location.hash = btoa(JSON.stringify({
            l: leftFormula,
            r: rightFormula,
        }));
    }
</script>

<div class="formula">
    <InputGroup>
        <Input type="text" bind:value="{leftFormula}" bind:disabled={$appState.isComputing}/>
        <InputGroupText>=</InputGroupText>
        <Input type="text" bind:value="{rightFormula}" bind:disabled={$appState.isComputing}/>
    </InputGroup>
    <Button color="primary" on:click={start} bind:disabled={$appState.isComputing}>Go</Button>
</div>
<div class="render-settings">
    <Input type="checkbox" bind:checked="{showGradients}" label="Show ramps"/>
    <Input type="checkbox" bind:checked="{highlightLucky}" label="Highlight lucky"/>
</div>

<style>
    .formula {
        display: flex;
        gap: 0.5rem;
    }

    .render-settings {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        margin-top: 0.4rem;
    }
</style>
