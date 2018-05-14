<template>
    <div class="administrators-form">
        <coo-form class="administratorsForm">
            <coo-form-item label="用户名:" :error.sync="errorName">
                <coo-input v-model="administrator" placeholder="请输入邮箱/手机"></coo-input>
            </coo-form-item>
            <coo-form-item label="用户昵称:" :error.sync="errorNickname">
                <coo-input placeholder="请输入用户昵称" v-model="nickname"></coo-input>
            </coo-form-item>
            <coo-form-item label="头像:">
                <coo-uploader :files="[avatar]" :readonly="true"></coo-uploader>
            </coo-form-item>
            <coo-form-item label="默认密码:">
                <coo-input placeholder="请输入密码" v-model="password" type="password" :readonly="true"></coo-input>
            </coo-form-item>
            <coo-form-item label="是否启用:">
                <coo-switch :value.sync="status"></coo-switch>
            </coo-form-item>
            <coo-form-item label="">
                <coo-button suffixIcon="circle-plus-o" @click="handleSave">保存记录</coo-button>
            </coo-form-item>
        </coo-form>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, CooSwitch, Form, FormItem, Input, Uploader} from '../../../compontents';
    import isEmail from 'validator/lib/isEmail';
    import isMobilePhone from 'validator/lib/isMobilePhone';
    import isLength from 'validator/lib/isLength';

    export default {
        components: {
            cooButton: Button,
            CooSwitch,
            cooForm: Form,
            cooFormItem: FormItem,
            cooInput: Input,
            cooUploader: Uploader
        },
        data () {
            return {
                administrator: '',
                nickname: '',
                avatar: 'http://tx.haiqq.com/uploads/allimg/170508/03292630Y-3.jpg',
                password: 'www_meitu_com',
                status: true,
                errorName: '',
                errorNickname: ''
            };
        },
        methods: {
            ...mapActions({
                create: 'administrators/create'
            }),
            handleSave () {
                // 邮箱 / 手机号码验证
                if (!isEmail(this.administrator) && !isMobilePhone(this.administrator, 'any')) {
                    this.errorName = '请输入正确的邮箱/手机';
                    return false;
                }

                // 密码验证
                // 6 - 16位密码
                if (!isLength(this.nickname, {min: 3, max: 32})) {
                    this.errorNickname = '请输入3~32位用户昵称';
                    return false;
                }

                this.create({
                    administrator: this.administrator,
                    nickname: this.nickname,
                    avatar: this.avatar,
                    password: this.password,

                }).then((response) => {
                    if (response.error) {
                        if (response.error.code === 6004) {
                            this.errorName = '用户名已存在';
                        }
                        return false;
                    }

                    this.administrator = '';
                    this.nickname = '';

                    this.$toast({
                        message: '添加成功',
                        type: 'circle-check'
                    });

                    this.$emit('create');
                });
            }
        }
    };
</script>
<style lang="scss" src="./form.scss"></style>
