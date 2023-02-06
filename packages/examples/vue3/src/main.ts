import { createApp } from 'vue';
import { TitianUI } from '@titian-design/mobile-vue';
import App from './App.vue';
import { router } from './router';

import './index.less';
import 'normalize.css';
const app = createApp(App);
app.use(TitianUI);
app.use(router);
app.mount('#root');
