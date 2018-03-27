/**
 * 用户账号 action
 * Created by 王佳欣 on 2017/5/27.
 */
import userApi from '../../api/user';
import * as userTypes from '../../constants/types/user';

export default {
    // 用户登录
    login ({ commit }, { username, password }) {
        return userApi.login({username, password}).then((response) => {
            if (response.meta.code === 0) {
                commit(userTypes.USER_LOGIN_SUCCESS, response.response);
            }
        });
    },
};
