/**
 * api 基础类
 * Created by 王佳欣 on 2018/3/24.
 */

require('es6-promise').polyfill();
import axios from 'axios';
import qs from 'qs';
import Auth from '../utils/auth';

export default class Base {
    /**
     *  axios 请求
     * @param url
     * @param data
     * @param method
     * @param withAuthToken
     * @returns {*}
     */
    request ({
                 url,
                 data = {},
                 method = 'get',
                 responseType = 'json',
                 contentType = 'application/x-www-form-urlencoded',
                 withAuthToken = false,
                 withCredentials = false
        }) {
        // 系列化请求参数
        let requestData;
        let params;
        if (method === 'get') {
            params = data;
        } else if (method === 'post') {
            requestData = qs.stringify(data);
        }
        let headers = {
            'Content-Type': contentType
        };

        if (withAuthToken) {
            headers['Authorization'] = Auth.getToken();
        }

        return axios({
            url,
            method,
            data: requestData,
            responseType,
            params,
            headers,
            withCredentials,
        }).then((response) => {
            if (response.status === 401) {
                window.app.$tip({message: 'token 失效了', type: 'circle-info'});
                resolve({
                    globalError: true,
                    error: {
                        code: 401,
                        msg: 'token 失效了'
                    }
                });
            } else if (response.status === 500) {
                window.app.$tip({message: '服务器内部出错', type: 'circle-info'});
                resolve({
                    globalError: true,
                    error: {
                        code: 500,
                        msg: '服务器内部出错'
                    }
                });
            } else if (response.status === 200) {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
                });
            }
            return new Promise((resolve, reject) => {
                reject(response.data);
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                window.app.$tip({message: '网络请求出错，请检查', type: 'circle-info'});
                return resolve({
                    globalError: true,
                    error: {
                        code: 500,
                        msg: error.message === 'Network Error' ? '网络请求出错，请检查....' : error.message
                    }
                });
            });
        });
    }
};
