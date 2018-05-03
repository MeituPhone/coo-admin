/**
 * 管理员相关 action
 * Created by 王佳欣 on 2017/5/27.
 */
import administratorsApi from '../../api/administrators';
import * as administratorsType from '../../constants/types/administrators';
import Auth from '../../utils/auth';

export default {
    // 用户登录
    login ({ commit }, { name, password }) {
        return administratorsApi.login({name, password}).then((response) => {
            if (response.token) {
                Auth.login(response.token);
            }
            return response;
        });
    },
    logout ( { commit } ) {
        return administratorsApi.logout().then(response => {
            Auth.logout();
            commit(administratorsType.ADMINISTRATOR_LOGOUT_SUCCESS);
            return response;
        });
    },
    me ({ commit }) {
        return administratorsApi.me().then((response) => {
            commit(administratorsType.ADMINISTRATOR_ME_SUCCESS, response);
        });
    },
};
