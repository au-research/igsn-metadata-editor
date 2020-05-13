<template>
    <div class="input-group">
        <label v-text="label"></label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'InputGroup',
    props: ['label']
}
</script>