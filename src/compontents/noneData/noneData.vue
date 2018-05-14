<template>
    <div class="coo-none">
        <coo-icon type="file3" class="coo-none-icon"></coo-icon>
        <p><slot></slot></p>
    </div>
</template>
<script>
    import Icon from '../icon/icon.vue';
    export default {
        components: {
            cooIcon: Icon
        },
    }
</script>
<style lang="scss" src="./noneData.scss"></style>
