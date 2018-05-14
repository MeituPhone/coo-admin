/**
 * 管理员 api 相关
 * Created by 王佳欣 on 2018/5/3.
 */

import { API_DOMAIN } from '../constants';
import Base from './base';

const RESOURCE_URL = `${API_DOMAIN}/api/administrators`;

class Administrators extends Base {
    /**
     *  用户登录
     */
    login ({name, password}) {
        let url = `${RESOURCE_URL}/auth/login`;
        return this.request({url, method: 'post', data: {name, password}});
    }

    /**
     * 退出登录
     */
    logout () {
        let url = `${RESOURCE_URL}/auth/logout`;
        return this.request({url, method: 'get'});
    }

    /**
     * 当前用户信息
     */
    me () {
        let url = `${RESOURCE_URL}/auth/me`;
        return this.request({url, method: 'get', withAuthToken: true});
    }

    /**
     * 创建管理员
     */
    create (data) {
        return this.request({url: RESOURCE_URL, method: 'post', data: {...data}, withAuthToken: true});
    }

    /**
     * 删除管理员
     */
    remove (id) {
        return this.request({url: `${RESOURCE_URL}/${id}`, method: 'delete', data: {}, withAuthToken: true});
    }

    /**
     * 通过ID获取
     */
    getOneById (id) {
        return this.request({url: RESOURCE_URL, method: 'get', data: {id}, withAuthToken: true});
    }

    /**
     * 获取列表
     */
    fetch ({page, per_page}) {
        return this.request({url: RESOURCE_URL, method: 'get', data: {page, per_page}, withAuthToken: true});
    }

    /**
     * 修改用户信息
     */
    update (data) {
        return this.request(({url: `${RESOURCE_URL}?type=edit`, method: 'put', data, withAuthToken: true}));
    }

    /**
     * 修改用户状态
     */
    toggleStatus (data) {
        data.include = 'status';
        return this.request(({url: `${RESOURCE_URL}?type=toggle_status`, method: 'put', data, withAuthToken: true}));
    }
};

export default new Administrators();