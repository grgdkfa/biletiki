<script lang="ts">
  import { Alert } from "@sveltestrap/sveltestrap";

    import { resultState } from "./stores/resultState";
</script>

<div class="stats">
    <Alert color="secondary">
        Lucky tickets: {$resultState.lucky} ({Math.round($resultState.lucky * 100 / 1000000)}%)
    </Alert>
</div>