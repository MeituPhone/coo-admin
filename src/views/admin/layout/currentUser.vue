<template>
    <div class="currentUser">
        <img src="../../../assets/images/user.jpg" class="currentUser_avatar" />
        <popover>
            <div class="menu">
                <a href="javascript:;" class="menu_item">
                    我的主页</a>
                <a href="javascript:;" class="menu_item">设置</a>
                <a href="javascript:;" class="menu_item">退出</a>
            </div>
        </popover>
    </div>
</template>
<script>
    import {Icon, Popover} from '../../../compontents';
    export default {
        components: {
            icon: Icon,
            popover: Popover,
        }
    };
</script>
<style lang="scss" src="./currentUser.scss"></style>
