<template >
    <div class="modal" v-if="show">
        <singleCard :outLineBtn="outLineBtn" :buttonText="buttonText" :showClose="showClose" :showOk="showOk" @ok="ok()" @close="close()">
            <slot></slot>
        </singleCard>
    </div>
</template>
<script setup>
import singleCard from '../cards/single-card.vue'

   defineProps ({
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
        } ,
        outLineBtn: {
            type: Boolean,
            default: false
        }
    })

    const emit =defineEmits(["ok", "update:show","close","update:show"])

       const ok=()=> {
            emit("ok", "");
            emit("update:show", false);
        }
        const close=()=> {
            emit("close", "");
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