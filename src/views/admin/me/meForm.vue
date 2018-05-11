<template>
    <div class="meForm">
        <div class="meForm-line">
            <coo-input size="small"
                       :placeholder="placeholder"
                       :type="type"
                       @focus="handleFocus"
                       v-model="inputValue">
            </coo-input>
        </div>
        <div class="meForm-line">
            <span class="meForm-error" v-if="errorMsg">{{errorMsg}}</span>
            <span class="meForm-tip" v-if="tipMsg">{{tipMsg}}</span>
            <coo-button size="mini" @click="handleSave">保存</coo-button>
            <coo-button size="mini" theme="info" @click="handleCancel">取消</coo-button>
        </div>
    </div>
</template>
<script>
    import {Button, Input} from '../../../compontents';
    import isLength from 'validator/lib/isLength';
    import {mapActions} from 'vuex';
    export default {
        props: {
            form: String,
            placeholder: String,
            value: String,
            type: String,
        },
        components: {
            cooButton: Button,
            cooInput: Input
        },
        watch: {
            value(val) {
                this.inputValue = val;
            }
        },
        data() {
            return {
                inputValue: this.value,
                errorMsg: '',
                tipMsg: '',
                isSaving: false,
            }
        },
        methods: {
            ...mapActions({
                update: 'administrators/update'
            }),
            validateNickname () {
                if (!isLength(this.inputValue, {min: 2, max: 16})) {
                    this.errorMsg = '请输入2 ~ 16 位昵称';
                    return false;
                }
                return true;
            },
            validatePassword () {
                if (!isLength(this.inputValue, {min: 6, max: 16})) {
                    this.errorMsg = '请输入 6 ~ 16 位密码';
                    return false;
                }
                return true;
            },
            showTip (message) {
                this.tipMsg = message;
                setTimeout(() => {
                    this.tipMsg = '';
                }, 1000);
            },
            handleFocus () {
                this.errorMsg = '';
            },
            handleSave () {
                if (this.isSaving) {
                    this.showTip('正在保存中...');
                    return false;
                }

                this.isSaving = true;
                let flag = true;
                if (this.form === 'nickname') {
                    flag = this.validateNickname();
                } else if (this.form === 'password') {
                    flag =this. validatePassword();
                }

                if (!flag) {
                    this.isSaving = false;
                    return false;
                }

                this.update({include: this.form, value: this.inputValue}).then((response) => {
                    this.isSaving = false;
                    this.$toast({
                        message: '修改成功',
                        type: 'circle-check'
                    });

                    setTimeout(() => {
                        this.$emit('save');
                    }, 2000);
                }).catch((error) => {
                    this.isSaving = false;
                    this.showTip(error.message);
                });
            },
            handleCancel () {
                this.$emit('cancel');
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../assets/scss/global/variables";
    .meForm{
        &-line{
            &:last-child{
                padding-top: 10px;
                text-align: right;
            }
        }
        &-error{
            color: $color-danger;
            margin-right: 20px;
            font-size: 12px;
        }
        &-tip{
            color: $color-gray;
            margin-right: 20px;
            font-size: 12px;
        }
    }
</style>
