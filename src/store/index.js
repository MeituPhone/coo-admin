/**
 * store
 * Created by 王佳欣 on 2018/3/24.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import administrators from './administrators';
import easyH5 from './easyH5';

Vue.use(Vuex);
// 模块
export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    ...global,
    modules: {
        user,
        administrators,
        easyH5
    },
});
