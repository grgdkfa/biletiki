import './app.css'
import App from './App.svelte'
import './i18n'
import { loadSignal } from './lib/stores/loadSignal';
import MainWorker from './lib/workers/mainWorker?worker'

const worker = new MainWorker();

const app = new App({
  target: document.getElementById('app')!,
  props: {
    worker
  }
})

function loadFromHash() {
  if (location.hash.length <=1) {
    return
  }
  try {
    const { l, r } = JSON.parse(atob(location.hash.slice(1)))
    if (l !== undefined && r !== undefined) {
        loadSignal.set({ l, r })
    }
  } catch(error) {
      console.error('Invalid data', error)
  }
}

loadFromHash()
addEventListener('hashchange', loadFromHash)

export default app
