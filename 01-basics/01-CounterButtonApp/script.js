import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = defineComponent({
  name: 'App',

  data() {
    return {
      counter: 0
    };
  },
  methods: {
    onClick() {
        this.counter += 1
    }
  },
  template: `<button type="button" @click="onClick">{{ $data.counter }}</button>`
});

const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
