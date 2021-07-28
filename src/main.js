import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import './styles/styles.scss';

Vue.config.productionTip = false;

Vue.use(require('moment'));
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(app),
}).$mount('#app');
