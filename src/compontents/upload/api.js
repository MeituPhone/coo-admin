export default {
    token: {
        qiniu: '//applet.meitu.com/public/index/token',
        s3: '//haiwai.data.meitu.com/aws/h5_token',
        oss: '//applet.meitu.com/public/index/oss_token',
        meitu: 'https://strategy.app.meitudata.com/upload/policy',
    },
    domain: {
        oss: '//make-channet-com.oss-cn-shenzhen.aliyuncs.com/',
        qiniu: '//upload.qbox.me/',
        meitu: '//upmt.meitudata.com/',
        s3: '', //通过uploadToken 动态获取
    },
    imgDomain: {
        oss:'//applet.meitudata.com/',
        qiniu: '//mtapplet.meitudata.com/',
        meitu: '//beauty-public.zone1.meitudata.com/',
        s3: 'https://h5img-jp.meitudata.com/',
    },
};