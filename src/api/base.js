/**
 * api 基础类
 * Created by 王佳欣 on 2018/3/24.
 */

require('es6-promise').polyfill();
import axios from 'axios';
import querystring from 'querystring';
import jsonp from 'jsonp';
import qs from 'qs';
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

        return axios({
            url,
            method,
            data: requestData,
            params: params,
            headers: {'Content-Type': contentType},
            withCredentials,
        }).then((response) => {
            if (response.status === 200) {
                if (response && response.data && response.data.meta && response.data.meta.code) {
                    // 未找到信息
                    if (response.data.meta.code === 2000) {

                    }

                    // 未登录
                    if (response.data.meta.code === 401) {

                    }
                }

                return new Promise((resolve, reject) => {
                    resolve(response.data);
                });
            }
            return new Promise((resolve, reject) => {
                reject(response.data);
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                return resolve({ globalError: true, message: error.message === 'Network Error' ? '网络请求出错，请检查....' : error.message });
            });
        });
    }

    /**
     * jsonp 请求
     * @param url
     * @param data
     * @returns {*}
     */
    jsonp ({
       url,
       data = {}
    }) {
        return new Promise((resolve, reject) => {
            jsonp(url + '?' + querystring.encode(data), (error, data) => {
                if (!error) {
                    if (data.meta.code === 2000) {

                    }

                    // 未登录跳转
                    if (data.meta.code === 401) {

                    }
                    return resolve(data);
                }
                return reject(data);
            });
        });
    }

    /**
     * 上传文件
     * @param url
     * @param data
     * @param method
     * @param responseType
     * @param contentType
     * @param withAuthToken
     * @param withCredentials
     * @returns {Promise.<T>|Promise<U>|*|Promise}
     */
    uploadFile ({
        url,
        data = {},
        method = 'post',
        responseType = 'json',
        contentType = 'multipart/form-data',
        withAuthToken = false,
        withCredentials = false
    }) {
        return axios({
            url,
            method,
            data,
            responseType,
            headers: {'Content-Type': contentType},
            withCredentials,
        }).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject(response.data);
        }).catch(error => {
            return new Promise((resolve, reject) => {
                return resolve({ globalError: true, message: error.message === 'Network Error' ? '网络请求出错，请检查....' : error.message });
            });
        });
    }
};
