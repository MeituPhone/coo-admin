<template>
    <div class="main-content magazine">
        <coo-city></coo-city>
        <div class="magazine_body">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import City from './city.vue';
    export default {
        components: {
            cooCity: City,
        }
    };
</script>
<style lang="scss" src="./magazine.scss"></style>
