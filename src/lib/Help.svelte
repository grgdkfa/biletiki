<script lang="ts">
    import { Offcanvas, Button, Icon } from '@sveltestrap/sveltestrap';
    import { _ } from 'svelte-i18n';
    import Legend from '../assets/legend.svelte';

    let isOpen = localStorage['help-open'] ? localStorage['help-open'] === '1' : true;

    const toggle = () => {
        isOpen = !isOpen;
        localStorage['help-open'] = isOpen ? '1' : '0';
    };
</script>

<Button type="info" on:click={toggle}>
    <Icon name="question-lg" />
</Button>
<Offcanvas {toggle} isOpen={isOpen} header={$_('help_title')}>
    <div class="help">
        <p>{@html $_('help_1')}</p>
        <p>{@html $_('help_2')}</p>
        <p>{@html $_('help_3')}</p>
        <p class="center"><Legend/></p>
        <p>{@html $_('help_4')}</p>
        <p>{@html $_('help_5')}</p>
    </div>
</Offcanvas>

<style>
    .center {
        display: flex;
        justify-content: center;
    }
</style>