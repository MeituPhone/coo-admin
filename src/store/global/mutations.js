/**
 *  全局mutation
 * Created by 王佳欣 on 2017/5/17.
 */

import * as globalTypes from '../../constants/types/global';

export default {
    /**
     * 全局错误信息处理
     * @param state
     * @param message
     */
    [globalTypes.SET_GLOBAL_ERROR] (state, {message}) {
        state.error = {
            show: true,
            message: message
        };
    },
    /**
     * 清除全局错误
     * @param state
     */
    [globalTypes.CLEAR_GLOBAL_ERROR] (state) {
        state.error = {
            show: false,
            message: ''
        };
    }
};
