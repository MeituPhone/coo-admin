/**
 * EasyH5
 * Created by 王佳欣 on 2018/5/14.
 */

import { API_DOMAIN } from '../constants';
import Base from './base';

const RESOURCE_URL = `${API_DOMAIN}/api/easy_h5`;

class EasyH5 extends Base {

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
    update ({condition, data}) {
        return this.request(({url: RESOURCE_URL, method: 'put', data: {condition, data}, withAuthToken: true}));
    }
};

export default new EasyH5();