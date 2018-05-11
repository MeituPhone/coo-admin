<template>
    <col :width="width">
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
