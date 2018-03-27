/**
 *  全局actions
 * Created by 王佳欣 on 2017/5/17.
 */

import * as globalTypes from '../../constants/types/global';

export default {
    /**
     * 清除全局错误信息
     * @param commit
     */
    clearError ({ commit }) {
        commit(globalTypes.CLEAR_GLOBAL_ERROR);
    },
};
