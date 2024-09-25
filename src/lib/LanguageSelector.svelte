<script lang="ts">
    import { TabContent, TabPane } from "@sveltestrap/sveltestrap";
    import { locale } from "svelte-i18n";

    let selected = 'en';

    locale.subscribe(newLocale => {
        if (newLocale) {
            selected = newLocale.split('-')[0];
        }
    });

    function changeLocale(event: CustomEvent<string | number>) {
        locale.set(event.detail.toString());
    }
</script>

<TabContent pills on:tab={changeLocale}>
    <TabPane tabId="en" tab="EN" active={selected == 'en'}></TabPane>
    <TabPane tabId="ru" tab="RU" active={selected == 'ru'}></TabPane>
</TabContent>