<template>
    <div class="magazineList">
        <coo-form class="magazineForm">
            <coo-form-item label="城市名称:" error="错误信息提示">
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
                <coo-button suffixIcon="circle-plus-o">保存记录</coo-button>
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

            };
        }
    };
</script>
<style lang="scss" src="./magazineList.scss"></style>
