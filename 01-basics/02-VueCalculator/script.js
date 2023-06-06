import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = defineComponent({
  name: 'App',

  computed: {
    result() {
      switch(this.operator) {
        case 'sum': return this.firstInput + this.secondInput
        case 'subtract': return this.firstInput - this.secondInput
        case 'multiply': return this.firstInput * this.secondInput
        case 'divide': return this.firstInput / this.secondInput
      }
      return 0
    },
  },

  data() {
    return {
      firstInput: null,
      secondInput: null,
      operator: null
    };
  },
  methods: {
    onSelectOperator($event) {
      this.operator = $event.target.value;
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
