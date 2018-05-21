export default {
    _get_img_type(tar) {
        let img_type;
        if (typeof tar === 'string' || !tar) {
            img_type = 'jpg';
        } else {
            let type = tar.type.replace('image/', '');
            if (type == 'jpg' || type == 'jpeg' || type == 'png') {
                img_type = type;
            } else {
                img_type = 'jpg';
            }
        }
        return img_type;
    },
    _get_up_type(type) {
        let up_type;
        switch (type) {
            case 0:
            case 'oss':
                up_type = 'oss';
                break;
            case 1:
            case 'qiniu':
                up_type = 'qiniu';
                break;
            case 2:
            case 's3':
                up_type = 's3';
                break;
            case 3:
            case 'meitu':
                up_type = 'meitu';
                break;
            default:
                up_type = 'oss';
        }
        return up_type;
    },
    _ajax(options) {
        if (!options || !options.url) {
            console.log('ajax options required');
            return;
        }
        let {
            type = 'GET',
            success = () => {},
            error = () => {},
            timeout = 20000,
            url = '',
            data = {},
            dataType = 'json',
        } = options;
        let params = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                params += key + '=' + data[key] + '&';
            }
        }
        params && params.replace(/&$/, '');
        params += 'timestamp=' + new Date().getTime();
        type = type.toUpperCase();
        if (dataType == 'jsonp') {
            let cb = 'fn' + new Date().getTime();
            let script = document.createElement('script');
            script.id = 'id_' + cb;
            url += '?' + params + '&callback=' + cb;
            window[cb] = function(data) {
                if (data.code == 0) {
                    success(data);
                } else {
                    error({msg: 'jsonp error'});
                }
                setTimeout(() => {
                    window[cb] = null;
                }, 1000);
                let el = document.getElementById('id_' + cb);
                el.parentNode.removeChild(el);
            };
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
            let oAjax = XMLHttpRequest
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            if (type === 'GET') {
                oAjax.open('GET', url + '?' + params, true);
                oAjax.timeout = timeout;
                oAjax.send();
            } else {
                oAjax.open('POST', url, true);
                oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
                oAjax.timeout = timeout;
                oAjax.send(params);
            }
            oAjax.ontimeout = () => {
                error({msg: 'get token error', xhr: oAjax});
            };
            oAjax.onreadystatechange = () => {
                if (oAjax.readyState === 4) {
                    if (oAjax.status === 200) {
                        let response;
                        if (oAjax.responseText) {
                            response = JSON.parse(oAjax.responseText);
                        } else {
                            response = {
                                status: 200,
                            };
                        }
                        success(response, oAjax);
                    } else {
                        error({msg: 'get token error', xhr: oAjax});
                    }
                }
            };
            return oAjax;
        }
    },
    _encode(str) {
        let c1,
            c2,
            c3;
        let base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let i = 0,
            len = str.length,
            string = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += '==';
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += '=';
                break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return string;
    },
    _dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?)/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    },
    checkSystem() {
        let UA = window.navigator.userAgent.toLowerCase();
        let lowVersion = false;
        let IE8lte = (!window.addEventListener || /MSIE 8/.test(navigator.userAgent));
        let lowAndroid = /android|adr/gi.test(UA) && (UA.substr(UA.indexOf('android') + 8, 3)) < 4.3;
        if (lowAndroid || IE8lte) {
            lowVersion = true;
        }
        return lowVersion;
    },
    extend(obj1, obj2) {
        for (let k in obj2) {
            if (obj2.hasOwnProperty(k)) {
                if (typeof obj2[k] == 'object') {
                    if (typeof obj1[k] !== 'object' || obj1[k] === null) {
                        obj1[k] = {};
                    }
                    this.extend(obj1[k], obj2[k]);
                } else {
                    obj1[k] = obj2[k];
                }
            }
        }
        return obj1;
    },
};