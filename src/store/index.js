/**
 * store
 * Created by 王佳欣 on 2018/3/24.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);
// 模块
export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    ...global,
    modules: {
        user
    },
});
