/**
 *  全局store
 * Created by 王佳欣 on 2017/5/17.
 */

import actions from './actions';
import mutations from './mutations';

const state = {
    error: {
        show: false,
        message: ''
    },                              // 全局错误信息
};

const getters = {
    error (state) {
        return state.error;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
