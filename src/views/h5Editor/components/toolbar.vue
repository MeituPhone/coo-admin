<template>
    <div class="toolbar">
        <coo-button prefixIcon="circle-chevron-left-o" size="small" theme="transparent"  @click="handleGoBack">返回</coo-button>
        <coo-button prefixIcon="circle-check-o" size="small" theme="transparent" @click="handleSave">保存</coo-button>
        <coo-button prefixIcon="eye" size="small" theme="transparent"  @click="handlePreview">预览</coo-button>
        <coo-dialog
                :visible.sync="showDialog"
                type="dialog"
                title="给你的活动取个名字吧..."
                :lock="true"
                :cancel='true'
                :width="500"
                :beforeOk="handleConfirmSave"
        >
            <coo-form>
                <coo-form-item label="活动名称:" :error.sync="errorName">
                    <coo-input v-model="name" placeholder="请输入活动名称"></coo-input>
                </coo-form-item>
            </coo-form>
        </coo-dialog>
    </div>
</template>
<script>
    import {Button, Dialog, Form, FormItem, Input} from '../../../compontents';
    import {mapActions, mapGetters} from 'vuex';
    import isLength from 'validator/lib/isLength';
    export default {
        components: {
            cooButton: Button,
            cooDialog: Dialog,
            cooForm: Form,
            cooFormItem: FormItem,
            cooInput: Input
        },
        data () {
            return {
                showDialog: false,
                name: '',
                errorName: ''
            };
        },
        computed: {
            ...mapGetters({
                files: 'easyH5/files'
            })
        },
        methods: {
            ...mapActions({
                create: 'easyH5/create'
            }),
            handleSave () {
                if (!this.files.length || !this.files[0].src) {
                    this.$tip({message: '请先编辑活动', type: 'circle-info'});
                    return false;
                }

                this.showDialog = true;
            },
            handleConfirmSave (done) {
                if (!isLength(this.name, {min: 4, max: 16})) {
                    this.errorName = '请输入4~16的活动名称';
                    return false;
                }

                this.create({name: this.name, content: this.files, type: 'h5_page'}).then((result) => {
                    if (result.error) {
                        this.$tip({message: result.error.msg, type: 'circle-info'});
                    } else {
                        done();
                    }
                });
            },
            handleGoBack () {

            },
            handlePreview () {

            }
        }
    };
</script>
<style lang="scss" src="./toolbar.scss"></style>
