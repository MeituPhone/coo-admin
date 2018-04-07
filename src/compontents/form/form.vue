<template>
    <div class="cooForm">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            width: String,
            labelWidth: {
                type: String,
                default: '100px'
            },
            layout: {
                type: String,
                default: 'horizontal',
                validator: value => ['horizontal', 'vertical'].indexOf(value) > -1,
            },
            size: {
                type: String,
                validator: value => ['medium', 'small', 'mini', ''].indexOf(value) > -1,
                default: ''
            }
        }
    };
</script>
<style lang="scss" src="./form.scss"></style>
