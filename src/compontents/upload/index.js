import './canvasresize';
import api from './api';
import utils from './utils';
export default class upload {
    constructor(options) {
        this.ops = {
            type: 0,                        // 0:oss  1:qiniu   2:s3   3: meitu
            width: 800,                     // 压缩宽度；
            quality: 90,                    // 图片质量；
            timeout: 20000,                 // 超时时间；
            preToken: false,                // 初始化实例的时候是否预载 token;
            tokenParams:{},                 // 请求token时带的参数；
            api,                            // 请求的api地址；
        };
        this.ops = utils.extend(this.ops, options);
        this.lowVersion = utils.checkSystem();
        this.type = utils._get_up_type(this.ops.type);
        this.canvasTime = 0;
        this.callback = {};
        this.uping = false;
        this.canvasResize = canvasResize;
        if (this.ops.preToken) this._get_token();
    }
    protocol(url){
        let _protocol = location.href.indexOf('https') == 0 ? 'https:':'http:';
        if(typeof url == 'string' && url.indexOf('http') == -1){
            return _protocol + url;
        }else{
            return url;
        }
    }
    // 对外暴露api
    // @param target 需要上传的目标图片 file/blob/base64
    // @param success 成功回调 第一个参数为 { pic:url , type:上传途径 , uploadTime:上传时间，canvasTime:转成base64的时间 }
    // @param error 失败回调 参数为 { msg:'' , xhr: }
    // @param start
    // @param progress 进度回调 参数为 { status: start / pending / complete}
    up(target, callback = {}, error, start, progress) {
        let successCb,
            errorCb,
            startCb,
            progressCb;
        // 兼容两种参数传入方式
        if (typeof callback == 'function') {
            successCb = callback;
            errorCb = error || function() {};
            startCb = start || function() {};
            progressCb = progress || function() {};
        } else if (typeof callback == 'object') {
            successCb = callback.success || function() {};
            errorCb = callback.error || function() {};
            startCb = callback.start || function() {};
            progressCb = callback.progress || function() {};
        }
        // 容错机制
        if (typeof target !== 'object' && typeof target !== 'string') {
            console.error('upload target is wrong!');
            errorCb({msg: '错误的上传对象'});
            return;
        }
        if (this.uping) {
            console.error('one upload instance can not upload two images at the same time!');
            errorCb({msg: '单个实例无法同时多次上传'});
            return;
        }
        let tar_type = typeof target == 'string' ? 'b64' : 'file';
        this.uping = true;
        this.img_type = utils._get_img_type(target);
        this.callback.success = successCb;
        this.callback.error = errorCb;
        this.callback.start = startCb;
        this.callback.progress = progressCb;
        // 低端手机由于不支持base64转blob，因此oss和s3无法直传base64，只能使用qiniu；
        if(this.lowVersion && this.ops.type !== 1 && this.ops.type !== 'qiniu' && tar_type == 'b64'){
            console.log('becasuse of the lowVersion of phone,it has to upload by qiniu!');
            this.type = 'qiniu';
            this.token = null;
        }
        // 开始上传，获取token
        this._get_token(() => {
            // token获取后，上传开始的钩子函数
            this.callback.start();
            this.callback.progress(0);
            if (tar_type == 'b64') {
                // 如果文件格式为base64，在低版本 || 途径为 qiniu 时，直接使用七牛进行上传;
                // 当途径为s3 && oss && 高版本浏览器时，会将base64转换成blob对象再上传s3/oss途径
                this._handle_b64(target,b64 =>{
                    if (this.type == 'qiniu' || this.type == 'meitu' || this.lowVersion) {
                        this._up_b64_qiniu_meitu(b64);
                    } else {
                        let file = utils._dataURLtoBlob(b64);
                        this._up_file(file);
                    }
                });
            } else if (tar_type == 'file') {
                // 如果文件格式为file，在高版本浏览器中，会通过canvas进行压缩后转成base64再转成blob进行上传
                // 在低版本浏览器中，则会直接上传原图
                if (!this.lowVersion) {
                    this._to_b64(target, b64 => {
                        // 压缩后如果途径为qiniu，则直接使用base64进行上传
                        // 如果为oss/s3，则转换成blob对象后上传
                        if (this.type == 'qiniu' || this.type == 'meitu') {
                            this._up_b64_qiniu_meitu(b64);
                        } else {
                            let base64 = b64.indexOf('data:image') !== -1
                                ? b64
                                : 'data:image/jpeg;base64,' + b64;
                            let file = utils._dataURLtoBlob(base64);
                            this._up_file(file);
                        }
                    });
                } else {
                    this._up_file(target);
                }
            }
        });
    }
    fileToBase64(file, ops){
        canvasResize(file, {
            width: ops.width || 3000,
            crop: false,
            quality: ops.quality || .9,
            rotate: ops.rotate || 0,
            callback(b64){
                ops.success && ops.success(b64);
            },
        });
    }
    // 获取token
    _get_token(cb = () => {}) {
        let url = this.ops.api.token[this.type];
        let data,
            dataType;
        let self = this;
        if (this.token) {
            cb();
            return;
        }
        switch (this.type) {
            case 'oss':
            case 'qiniu':
            case 'meitu':
                data = this.ops.tokenParams;
                dataType = 'json';
                break;
            case 's3':
                data = {
                    bucket: 'h5-jp',
                    file_type: this.img_type || 'jpg',
                    ...this.ops.tokenParams,
                };
                dataType = 'jsonp';
                break;
            default:
        }
        utils._ajax({
            url,
            data,
            dataType,
            timeout: this.ops.timeout,
            success(token) {
                if (!self.token) {
                    if(self.type==='meitu'){
                        token = token[0].mtyun;
                        self.token = {
                            upload_token:token.token,
                            key:token.key,
                            ttl: token.ttl,
                            url:token.url,
                        };
                    }else{
                        self.token = token;
                    }
                }
                cb();
            },
            error(xhr) {
                if (self.callback.error) {
                    self.callback.error({msg: 'get token fail', xhr});
                }
                self.uping = false;
            },
        });
    }
    // 压缩base64;
    _handle_b64(b64,cb){
        let st = new Date().getTime();
        let image = new Image();
        let rb64;
        let base64 = b64.indexOf('data:image') !== -1 ? b64 : 'data:image/jpeg;base64,' + b64;
        image.onload = ()=>{
            if(image.width > this.ops.width){
                let canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    ir = image.width / image.height,
                    rw = this.ops.width,
                    rh = this.ops.width / ir;
                canvas.width = rw;
                canvas.height = rh;
                ctx.drawImage(image,0,0,rw,rh);
                this.canvasTime = new Date().getTime() - st;
                rb64 = canvas.toDataURL('image/jpeg');
            }else{
                rb64 = b64;
            }
            cb(rb64);
        };
        image.onerror = ()=>{
            cb(b64);
        };
        image.src = base64;
    }
    _to_b64(file, cb) {
        let st = new Date().getTime();
        let self = this;
        canvasResize(file, {
            width: this.ops.width,
            crop: false,
            quality: this.ops.quality,
            rotate: 0,
            callback: function(b64) {
                self.canvasTime = new Date().getTime() - st;
                cb(b64);
            },
        });
    }
    _up_file(file) {
        let startTime = new Date();
        let xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        let fd = new FormData();
        let url,
            token;
        if (this.type == 's3') {
            token = this.token.data.inputs;
            url = this.token.data.url;
            for (let i in token) {
                fd.append(i, token[i]);
            }
        } else if (this.type == 'oss') {
            token = this.token;
            url = this.ops.api.domain[this.type];
            for (let i in token) {
                if (i == 'accessid') {
                    fd.append('OSSAccessKeyId', token[i]);
                } else {
                    fd.append(i, token[i]);
                }
            }
        } else if (this.type == 'qiniu' || this.type == 'meitu') {
            token = this.token;
            url = this.ops.api.domain[this.type];
            fd.append('token', this.token.upload_token);
            fd.append('key', this.token.key);
        }
        fd.append('file', file);
        xhr.onreadystatechange = response => {
            this._up_cb(xhr, response, startTime);
        };
        xhr.ontimeout = () => {
            this.callback.error({msg: 'upload timeout', xhr});
            this.uping = false;
        };
        xhr.upload.addEventListener('progress', this._up_progress.bind(this), false);
        xhr.open('POST', url, true);
        xhr.timeout = this.ops.timeout;
        xhr.send(fd);
    }
    _up_b64_qiniu_meitu(b64) {
        let startTime = new Date();
        let url = this.ops.api.domain[this.type] + 'putb64/-1/key/' + utils._encode(this.token.key);
        let base64 = b64.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
        let xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = response => {
            this._up_cb(xhr, response, startTime);
        };
        xhr.ontimeout = () => {
            this.callback.error({msg: 'upload timeout', xhr});
            this.uping = false;
        };
        xhr.upload.addEventListener('progress', this._up_progress.bind(this), false);
        xhr.open('POST', url, true);
        xhr.timeout = this.ops.timeout;
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Authorization', 'UpToken ' + this.token.upload_token);
        xhr.send(base64);
    }
    _up_progress(e) {
        if (e.lengthComputable) this.callback.progress(Math.round(e.loaded * 100 / e.total));
    }
    _up_cb(xhr, response, st) {
        let s = xhr.status;
        if (xhr.readyState == 4) {
            this.uploadTime = new Date().getTime() - st;
            if (s >= 200 && s < 300) {
                if (this.type == 's3') {
                    // let xml = xhr.responseText;
                    // let domParser = new DOMParser();
                    // let xmlDoc = domParser.parseFromString(xml, 'text/xml');
                    // 兼容ios 8;
                    // if(xmlDoc.children){
                    //     this.img = xmlDoc.children[0].children[0].innerHTML;
                    // }else{
                    //     this.img = xmlDoc.childNodes[0].childNodes[0].textContent;
                    // }
                    this.img = this.ops.api.imgDomain.s3 + this.token.data.inputs.key;
                } else if (this.type == 'qiniu' || this.type == 'meitu') {
                    let res = xhr.responseText
                        ? JSON.parse(xhr.responseText)
                        : xhr.responseText;
                    this.img = this.type ===  'meitu' ? res.data : (this.ops.api.imgDomain[this.type]+ res.key);
                } else if (this.type == 'oss') {
                    // 由于 oss 的图片地址是根据请求地址来的，因此获取的图片地址需要添加协议头；
                    this.img = this.ops.api.imgDomain.oss + this.token.key;
                }
                this.__return({
                    img: this.ops.tokenParams.type==='photo-key' ? this.img : this.protocol(this.img),
                    uploadTime: this.uploadTime,
                    type: this.type,
                    canvasTime: this.canvasTime,
                    res:{
                        token: this.token,
                        upload: xhr.responseText,
                    },
                });
            } else {
                this.callback.error({msg: 'upload xhr.status is not 200', xhr});
                this.uping = false;
            }
        }
    }
    __return(ops) {
        this.token = null;
        this.uping = false;
        this.callback.success(ops);
    }
}