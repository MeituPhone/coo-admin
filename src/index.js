/**
 * Created by 王佳欣 on 2018/3/24.
 */

import './assets/scss/index.scss';

// 引入组件
import './compontents';

// 入口页
import Vue from 'vue';
import store from './store';
import router from './router';
const app = new Vue({router, store});
window.app = app;

window.addEventListener('DOMContentLoaded', () => app.$mount('#admin-app'), false);
