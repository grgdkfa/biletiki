<script lang="ts">
    import { Button, Input, InputGroup, InputGroupText, Icon, Tooltip } from '@sveltestrap/sveltestrap';
    import { _ } from 'svelte-i18n';
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
    <Button color="primary" on:click={start} bind:disabled={$appState.isComputing}><Icon name="brush"/></Button>
</div>
<div class="render-settings">
    <div>
        <Input type="checkbox" bind:checked="{showGradients}" label={$_('show_gradients')}/>
        <Button id="settings-gradients" type="info" outline size="sm">
            <Icon name="info-lg"/>
        </Button>
    </div>
    <div>
        <Input type="checkbox" bind:checked="{highlightLucky}" label={$_('highlight_lucky')}/>
        <Button id="settings-highlight" type="info" outline size="sm">
            <Icon name="info-lg"/>
        </Button>
    </div>
</div>

<Tooltip target="settings-gradients" placement="bottom">
    {$_('show_gradients_help')}
</Tooltip>

<Tooltip target="settings-highlight" placement="bottom">
    {$_('highlight_lucky_help')}
</Tooltip>

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

    .render-settings div {
        display: flex;
        align-items: center;
    }
</style>
