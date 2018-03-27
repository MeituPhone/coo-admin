<template>
    <div class="cooGrid_col">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            width: Number,
            prop: String,
            label: String
        },
    };
</script>
