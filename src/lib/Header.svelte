<script lang="ts">
  import { Container, TabContent, TabPane } from "@sveltestrap/sveltestrap";
  import Help from "./Help.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";

</script>

<div class="header">
    <Container lg>
      <div class="wrapper">
        <Help></Help>
        <LanguageSelector></LanguageSelector>
      </div>
    </Container>
</div>

<style>
  .header {
    background-color: var(--bs-body-color);
    padding: 0.3rem 0;
    margin-bottom: 1rem;
  }

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>