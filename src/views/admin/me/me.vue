<template>
    <div class="main-content me">
        <h2 class="me-title">
            我的资料
            <img :src="me.avatar" class="me-avatar" />
        </h2>
        <div class="me-box">
            <div class="me-line">
                <span class="me-label">用户名：</span>{{me.administrator}}
            </div>
            <div class="me-line">
                <span class="me-label">用户昵称：</span>{{me.nickname}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data () {
            return {

            };
        },
        computed: {
            ...mapGetters({
                me: 'administrators/me'
            }),
        },
        methods: {
            ...mapActions({
                update: 'administrators/update'
            })
        },
        created () {

        }
    };
</script>
<style lang="scss" src="./me.scss"></style>
