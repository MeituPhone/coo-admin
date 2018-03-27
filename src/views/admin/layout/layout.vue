<template>
    <div class="layout">
        <div class="layout_top">
            <h1 class="layout_logo">美图移动</h1>
            <current-user></current-user>
        </div>
        <div class="layout_container">
            <sidebar></sidebar>
            <div class="layout_viewport">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from './sidebar.vue';
    import CurrentUser from './currentUser.vue'
    export default {
        components: {
            sidebar: Sidebar,
            currentUser: CurrentUser,
        }
    };
</script>
<style lang="scss" src="./layout.scss"></style>
