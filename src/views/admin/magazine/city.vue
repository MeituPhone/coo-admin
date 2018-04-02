<template>
    <div class="city_wrapper">
        <router-link class="city_item" v-for="city in cities" :to='`/admin/magazine/city/${city.id}`' active-class="city_item-active">
            <div class="city_title"><coo-icon type="tag-reverse"></coo-icon> <span class="city_name">{{ city.name }}</span></div>
            <div class="city_data">
                <span class="city_date">{{ city.updated_at }}</span>
                <span class="city_total">{{ city.total }}篇</span>
            </div>
            <a href="javascript:;" class="city_edit">
                <coo-icon type="edit"></coo-icon>
            </a>
            <a href="javascript:;" class="city_delete">
                <coo-icon type="trash"></coo-icon>
            </a>
        </router-link>
        <div class="city_none" v-if="!cities.length">
            <p>没有找到城市</p>
            <coo-button size="small">新增城市</coo-button>
        </div>
    </div>
</template>
<script>
    import {Icon, Button} from '../../../compontents';
    export default {
        components: {
            cooButton: Button,
            cooIcon: Icon,
        },
        data () {
            return {
                cities: [
                    {
                        id: 1,
                        name: '杭州',
                        updated_at: '2018-02-03',
                        total: 10
                    },
                    {
                        id: 2,
                        name: '上海',
                        updated_at: '2018-02-03',
                        total: 10
                    },
                    {
                        id: 4,
                        name: '北京',
                        updated_at: '2018-02-03',
                        total: 10
                    }
                ]
            };
        }
    };
</script>
<style lang="scss" src="./city.scss"></style>
