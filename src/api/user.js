/**
 * 登录
 * Created by 王佳欣 on 2018/3/24.
 */

import { API_DOMAIN } from '../constants';
import Base from './base';

class User extends Base {
    /**
     *  用户登录
     */
    login ({username, password}) {
        let url = `${API_DOMAIN}/login`;
        return this.request({url, method: 'post', data: {username, password}});
    }
};

export default new User();
