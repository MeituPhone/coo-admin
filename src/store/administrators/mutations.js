/**
 *  用户
 * Created by 王佳欣 on 2017/5/27.
 */
import * as administratorsTypes from '../../constants/types/administrators';
export default {
    [administratorsTypes.ADMINISTRATOR_ME_SUCCESS] (state, me) {
        state.me = me;
    },
    [administratorsTypes.ADMINISTRATOR_LOGOUT_SUCCESS] (state) {
        state.me = {};
    },
    [administratorsTypes.ADMINISTRATOR_UPDATE_SUCCESS] (state, {include, value}) {
        state.me[include] = value;
    }
};
