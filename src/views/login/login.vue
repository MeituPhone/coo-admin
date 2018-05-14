<template>
    <div class="login">
        <div class="login-content">
            <div class="login-header">
                <div class="login-logo"></div>
                <div class="login-slogan">美图手机，让更多人变得更美！</div>
            </div>
            <div class="login-form">
                <div class="login-line">
                    <coo-input v-model="name" size="large" @focus="handleFocus" placeholder="邮箱/手机"></coo-input>
                </div>
                <div class="login-line">
                    <coo-input v-model="password" type="password" size="large" @focus="handleFocus" placeholder="密码"></coo-input>
                </div>
                <div class="login-line">
                    <coo-button suffixIcon="circle-right2" size="large" :animate="true" @click="handleClick">登录</coo-button>
                </div>
                <div class="login-error">
                    {{ errorMsg }}
                </div>
            </div>
        </div>
        <div class="login-footer">
            <a href="javascript:;">Copyright  © 2018  meitu.com </a>
            <span></span>
            <a href="javascript:;">H5服务平台</a>
            <span></span>
            <a href="javascript:;">疑问</a>
        </div>
    </div>
</template>
<script>
    import {Input, Button} from '../../compontents';
    import {mapActions} from 'vuex';
    import isEmail from 'validator/lib/isEmail';
    import isMobilePhone from 'validator/lib/isMobilePhone';
    import isLength from 'validator/lib/isLength';
    export default {
        components: {
            cooInput: Input,
            cooButton: Button,
        },
        data () {
            return {
                name: '',
                password: '',
                errorMsg: ''
            };
        },
        methods: {
            ...mapActions({
                login: 'administrators/login',
            }),
            handleFocus () {
                this.errorMsg = '';
            },
            handleClick () {
                // 邮箱 / 手机号码验证
                if (!isEmail(this.name) && !isMobilePhone(this.name, 'any')) {
                    this.errorMsg = '请输入正确的邮箱/手机';
                    return false;
                }

                // 密码验证
                // 6 - 16位密码
                if (!isLength(this.password, {min: 6, max: 16})) {
                    this.errorMsg = '请输入正确的密码';
                    return false;
                }

                this.login({name: this.name, password: this.password}).then((result) => {
                    if (result.token) {
                        this.$router.push('/admin/magazine');
                        return false;
                    }

                    this.errorMsg = result.msg;
                });
            },
        },
        created () {

        },
    };
</script>
<style lang="scss" src="./login.scss"></style>
