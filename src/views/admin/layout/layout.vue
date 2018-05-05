<template>
    <div class="layout">
        <div class="layout_top">
            <h1 class="layout_logo"></h1>
            <p class="layout_slogan">美图手机，让更多人变得更美</p>
            <current-user></current-user>
        </div>
        <div class="layout_container">
            <sidebar></sidebar>
            <div class="layout_viewport">
                <div class="layout_content">
                    <router-view></router-view>
                </div>
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
