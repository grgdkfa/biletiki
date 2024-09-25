import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import en from './i18n/en.json';
import ru from './i18n/ru.json';

addMessages('en', en);
addMessages('ru', ru);

console.log(getLocaleFromNavigator());

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator()
});