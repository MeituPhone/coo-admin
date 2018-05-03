<template>
    <div class="login">
        <div class="login_banner">Supporting Your Ideas</div>
        <div class="login_form">
            <div class="login_line">
                <coo-input v-model="name" size="large" placeholder="邮箱/手机"></coo-input>
            </div>
            <div class="login_line">
                <coo-input type="password" size="large" placeholder="密码" v-model="password"></coo-input>
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
    import {mapActions} from 'vuex';
    export default {
        components: {
            cooInput: Input,
            cooButton: Button,
        },
        data () {
            return {
                name: '',
                password: '',
            };
        },
        methods: {
            ...mapActions({
                login: 'administrators/login',
            }),
            handleClick () {
                this.login({name: this.name, password: this.password}).then((result) => {
                    if (result.token) {
                        this.$router.push('/admin/magazine');
                        return false;
                    }
                    this.$toast({message: result.error.msg, type: 'warning-o'});
                });
            },
        },
        created () {

        },
    };
</script>
<style lang="scss" src="./login.scss"></style>
