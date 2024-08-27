<script lang="ts">
    import { Alert } from "@sveltestrap/sveltestrap";
    import { appState } from "./stores/appState";
</script>

<Alert color="danger">{$appState.error}</Alert>