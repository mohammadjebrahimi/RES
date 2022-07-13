<template >
    <div class="modal" v-if="show">
    <slot></slot>
    </div>
</template>
<script>

export default {
    name: "default-modal",
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },

}
</script>
<style lang="scss">
.modal {
    @include flex-direction();
    position: fixed;
    @include z-index-group(3);
    top: 0;
    left: 0;
    background-image: url(@/assets/images/transpancy-dark.png);
    background-size: cover;
    width: 100Vw;
    height: 100vh;

    justify-content: center;
    align-items: center;

}
</style>