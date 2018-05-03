/**
 * 授权类
 * Created by 王佳欣 on 2018/5/3.
 */

export default {
    login (token) {
        localStorage.setItem('_token',  `bearer ${token}`);
    },
    getToken () {
        return localStorage.getItem('_token');
    },
    logout () {
        localStorage.removeItem('_token');
    }
};
