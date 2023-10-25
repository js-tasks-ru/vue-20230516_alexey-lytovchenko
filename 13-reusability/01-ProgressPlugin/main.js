import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createProgress } from './plugins/progress/index.js';

const progress = createProgress({ container: '#progress', router });

const app = createApp(App);
app.use(progress)
app.use(router)
app.mount('#app');
