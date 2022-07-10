<template >
    <div class="modal" v-if="show">
        <SingelCard :buttonText="buttonText" :showClose="showClose" :showOk="showOk" @ok="ok()" @close="close()">
            <slot></slot>
        </SingelCard>
    </div>
</template>
<script>
import SingelCard from '../cards/singel-card.vue'
export default {
    name: "default-modal",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        },
        showOk: {
            type: Boolean,
            default: true
        },
        buttonText: {
            type: String,
            default: 'تایید'
        }
    },
    methods: {
        ok() {
            this.$emit("ok", "");
            this.$emit("update:show", false);
        },
        close() {
            this.$emit("close", "");
            this.$emit("update:show", false);
        }
    },
    components: { SingelCard }
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