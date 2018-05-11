<template>
    <div class="main-content me">
        <h2 class="me-title">
            我的资料
            <img :src="me.avatar" class="me-avatar" />
        </h2>
        <div class="me-box">
            <div class="me-line">
                <span class="me-label">用户名：</span>
                <div class="me-val">
                    {{me.administrator}}
                </div>
            </div>
            <div class="me-line">
                <span class="me-label">用户昵称：</span>
                <div class="me-val" v-show="!editing || formName !== 'nickname'">
                    {{me.nickname}}
                    <a href="javascript:;" class="me-link" @click="showForm('nickname')"> <coo-icon type="edit"></coo-icon> 修改</a>
                </div>
                <me-form placeholder="请输入昵称"
                         type="input"
                         form="nickname"
                         @cancel="handleCloseForm"
                         @save="handleSaveSuccess"
                         v-if="editing && formName === 'nickname'"
                         :value="me.nickname">
                </me-form>
            </div>

            <div class="me-line">
                <span class="me-label">用户密码：</span>
                <div class="me-val" v-show="!editing || formName !== 'password'">
                    *********
                    <a href="javascript:;" class="me-link" @click="showForm('password')"> <coo-icon type="edit"></coo-icon> 修改</a>
                </div>
                <me-form
                        placeholder="6 ~ 16 位密码"
                        type="password"
                        form="password"
                        @cancel="handleCloseForm"
                        @save="handleSaveSuccess"
                        v-show="editing && formName === 'password'"
                        value="">
                </me-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import meForm from './meForm.vue';
    import {Icon} from '../../../compontents';
    export default {
        data () {
            return {
                editing: false,
                formName: ''
            };
        },
        components: {
            MeForm: meForm,
            CooIcon: Icon
        },
        computed: {
            ...mapGetters({
                me: 'administrators/me'
            }),
        },
        methods: {
            ...mapActions({
                update: 'administrators/update'
            }),
            showForm (form) {
                this.editing = true;
                this.formName = form;
            },
            handleCloseForm () {
                this.editing = false;
                this.formName = '';
            },
            handleSaveSuccess () {
                this.editing = false;
                this.formName = '';
            }
        },
        created () {

        }
    };
</script>
<style lang="scss" src="./me.scss"></style>
