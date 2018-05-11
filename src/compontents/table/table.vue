<template>
    <table class="coo-table" cellpadding="0" cellspacing="0" border="0">
        <colgroup>
            <slot></slot>
        </colgroup>
        <thead class="coo-table-head">
            <tr>
                <th class="coo-table-column" v-for="column in $children">
                    <div class="coo-table-cell">
                        {{ column.$props.label }}
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="coo-table-body">
            <coo-row :row="item" v-for="(item, index) in data">
                <td class="coo-table-column" v-for="column in $children">
                    <div class="coo-table-cell">
                        <template v-if="!column.$scopedSlots.default">
                            {{ column.$props.prop === '_lineNumber' ? `${index + 1}.` : item[column.$props.prop]  }}
                        </template>
                        <template v-else>
                            <slot :row="item"></slot>
                        </template>
                    </div>
                </td>
            </coo-row>
        </tbody>
    </table>
</template>
<script>
    import row from './row.vue';
    import col from './col.vue';
    export default {
        components: {
            cooRow: row,
            cooCol: col
        },
        props: {
            data: Array
        },
        data () {
            return {
                children: [],
                length: 0
            };
        },
        mounted () {
            console.log(this.$children);
        }
    };
</script>
<style lang="scss" src="./table.scss"></style>
