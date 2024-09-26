<script lang="ts">
  import { Alert, Button, Icon, Popover } from "@sveltestrap/sveltestrap";
  import { _ } from "svelte-i18n";
  import { copyText } from 'svelte-copy';

    import { resultState } from "./stores/resultState";
</script>

<div class="stats">
    <Alert color="secondary" class="stats-alert">
        <div class="stats-wrapper">
            <span>{$_('lucky_tickets')} {$resultState.lucky} ({($resultState.lucky * 100 / 1000000).toFixed(2)}%)</span>
            <Button type="primary" on:click={() => copyText(location.href)} id="share-button">
                <Icon name="share" />
            </Button>
            <Popover target="share-button" placement="bottom" dismissible>
                { $_('copied') }
            </Popover>
        </div>
    </Alert>
</div>

<style>
    .stats {
        margin-top: 0.5rem;
    }
    .stats-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>