import { createApp } from 'vue'
import { createPinia } from 'pinia';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import App from './App.vue'
import router from './plugin/router';
import { vuetify } from './plugin/vuetify';

const app = createApp(App);
app.use(createPinia());
app.use(router)
app.use(vuetify)
app.use(VueAwesomePaginate)
app.mount("#app");
