<template>
    <div class="magazineList">
        <coo-form class="magazineForm">
            <coo-form-item label="城市名称:" :error.sync="error">
                <coo-input placeholder="请输入城市名称"></coo-input>
            </coo-form-item>
            <coo-form-item label="城市名称:">
                <coo-input placeholder="请输入城市名称"></coo-input>
            </coo-form-item>
            <coo-form-item label="城市名称:">
                <coo-input placeholder="请输入城市名称"></coo-input>
            </coo-form-item>
            <coo-form-item label="城市名称:">
                <coo-input placeholder="请输入城市名称"></coo-input>
            </coo-form-item>
            <coo-form-item label="">
                <coo-button suffixIcon="circle-plus-o" @click="handleSave">保存记录</coo-button>
            </coo-form-item>
        </coo-form>
    </div>
</template>
<script>
    import {Form, FormItem, Input, Button} from '../../../compontents';
    export default {
        components: {
            cooForm: Form,
            cooFormItem: FormItem,
            cooInput: Input,
            cooButton: Button
        },
        data () {
            return {
                error: ''
            };
        },
        methods: {
            handleSave () {
                this.error = '错误信息提示';
            }
        }
    };
</script>
<style lang="scss" src="./magazineList.scss"></style>
