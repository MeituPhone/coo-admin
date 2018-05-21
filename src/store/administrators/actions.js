/**
 * 管理员相关 action
 * Created by 王佳欣 on 2017/5/27.
 */
import administratorsApi from '../../api/administrators';
import * as administratorsType from '../../constants/types/administrators';
import Auth from '../../utils/auth';

export default {
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
    create ({ commit }, data) {
        return administratorsApi.create(data);
    },
    remove ({ commit }, id) {
        return administratorsApi.remove(id)
    },
    update ({ commit }, { value, include }) {
        return administratorsApi.update({value, include}).then((response) => {
            commit(administratorsType.ADMINISTRATOR_UPDATE_SUCCESS, {value, include});
        });
    },
    toggleStatus ({ commit }, {id, value}) {
        return administratorsApi.toggleStatus({id, value});
    },
    fetch ({ commit }, {page, per_page}) {
        return administratorsApi.fetch({page, per_page});
    }
};
