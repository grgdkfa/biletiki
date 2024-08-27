<script lang="ts">
import { Progress } from "@sveltestrap/sveltestrap";
import { appState } from "./stores/appState";
</script>

<div class="stat-progress">
    <Progress color="primary" value="{$appState.progress}" max="100"></Progress>
</div>

<style>
    .stat-progress {
        margin: 1rem 0;
    }
</style>