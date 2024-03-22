import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import VueNiceTable from 'vue-nice-table';


const app = createApp(App);

app.component('VueNiceTable', VueNiceTable);

app.mount('#app');
