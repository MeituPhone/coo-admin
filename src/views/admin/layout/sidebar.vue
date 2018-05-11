<template>
    <div class="sidebar">
        <router-link to="/admin/magazine" class="sidebar_item" active-class="sidebar_item-active">
            <div class="sidebar_text">
                <span>
                    <icon type="file"></icon>城市杂志
                </span>
            </div>
        </router-link>
        <router-link to="/admin/questions" class="sidebar_item" active-class="sidebar_item-active">
            <div class="sidebar_text">
                <span>
                    <icon type="file"></icon>题库管理
                </span>
            </div>
        </router-link>
        <router-link to="/admin/list" class="sidebar_item" active-class="sidebar_item-active">
            <div class="sidebar_text">
                <span>
                    <icon type="org-user"></icon>用户管理
                </span>
            </div>
        </router-link>
        <a href="/#/allicons" class="sidebar_item" target="_blank">
            <div class="sidebar_text">
                <span>
                    <icon type="menu"></icon>所有Icon
                </span>
            </div>
        </a>
    </div>
</template>
<script>
    import {Icon} from '../../../compontents';
    export default {
        components: {
            icon: Icon
        }
    };
</script>
<style lang="scss" src="./sidebar.scss"></style>
