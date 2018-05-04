<template>
    <div class="main-content me">
        <h2 class="me-title">我的基本资料</h2>
        <div class="me-box">
            <div class="me-line">
                用户名：{{me.nickname}}
            </div>
            <div class="me-line">
                用户昵称：{{me.administrator}}
            </div>
            <div class="me-line">
                用户头像：{{me.avatar}}
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
