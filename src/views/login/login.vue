<template>
    <div class="login">
        <div class="login_banner">Supporting Your Ideas</div>
        <div class="login_form">
            <div class="login_line">
                <coo-input v-model="username" placeholder="邮箱/手机"></coo-input>
            </div>
            <div class="login_line">
                <coo-input type="password" placeholder="密码" v-model="password"></coo-input>
            </div>
            <div class="login_line">
                <coo-button suffixIcon="circle-right2" :animate="true" @click="handleClick">登录</coo-button>
            </div>
        </div>
        <div class="login_footer">
            <a href="javascript:;">H5服务平台</a>
            <span></span>
            <a href="javascript:;">疑问</a>
        </div>
    </div>
</template>
<script>
    import {Input, Button} from '../../compontents';
    export default {
        components: {
            cooInput: Input,
            cooButton: Button,
        },
        data () {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            handleClick () {
                this.$router.push('/admin/magazine');
            },
        },
        created () {

        },
    };
</script>
<style lang="scss" src="./login.scss"></style>
