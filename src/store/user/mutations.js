/**
 *  用户
 * Created by 王佳欣 on 2017/5/27.
 */
import * as userTypes from '../../constants/types/user';
export default {
    [userTypes.USER_LOGIN_SUCCESS] (state, user) {
        state.user = user;
    }
};
