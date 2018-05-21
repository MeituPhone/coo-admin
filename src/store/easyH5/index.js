/**
 *  用户 store
 * Created by 王佳欣 on 2017/5/27.
 */
import actions from './actions';
import mutations from './mutations';

const state = {
    files: []
};

const getters = {
    files (state) {
        return state.files.length ? state.files : [{}];
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
