<template >
    <div class="modal" v-if="show">
        <singleCard :outLineBtn="outLineBtn" :buttonText="buttonText" :showClose="showClose" :showOk="showOk" @ok="ok()"
            @close="close()">
            <slot></slot>
        </singleCard>
    </div>
</template>
<script setup lang="ts">
import singleCard from '../cards/single-card.vue'
type propShape = {
    show: boolean
    showClose?: boolean
    showOk?: boolean
    buttonText?: string
    outLineBtn?: boolean
}
type emitShape = {
    (e: "ok"): void
    (e: "update:show", value: boolean): void
    (e: "close"): void
}
const props = withDefaults(defineProps<propShape>(), {
    show: false,
    showClose: true,
    showOk: true,
    buttonText: 'تایید',
    outLineBtn: false,
})
const emit = defineEmits<emitShape>()

const ok = (): void => {
    emit("ok");
    emit("update:show", false);
}
const close = (): void => {
    emit("close");
    emit("update:show", false);
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