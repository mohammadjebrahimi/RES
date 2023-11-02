<template>
    <div class="select-box">
        <vSelect @search="onSearch($event)" v-model="selectValue" :label="optionValue" :reduce="(option:any ) => option"
            :options="options" multiple class="select-box__v-select">
            <template #no-options="{ search, searching, loading }">
                <button @click="btnClicked(search)" class="select-box__button">افزوده شود</button>
            </template>
        </vSelect>
        <label :for="id" class="select-box__input-label">{{ label }}</label>
    </div>
</template>
<script setup lang="ts">
import type { selectInput } from '@/types/types';
import { ref, toRefs, watch } from 'vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

type emitShape={
    (e: 'update:value',newValue:string[]): void
    (e: 'OptionBtnClicked',search?:string): void
}
const emit = defineEmits<emitShape>()
const props = withDefaults(defineProps<selectInput>(), {
    value: () => [],
    onSearch: () => { },
    ltr: false
})
const { value } = toRefs(props)
const selectValue = ref<string[]>(value.value)
watch(selectValue, async (newValue:string[]) => {
    emit('update:value', newValue)
})

const btnClicked = (search:string):void => {
    console.log(search);
    
    emit('OptionBtnClicked', search)
}
</script>
<style lang="scss">
.select-box {
    @include flex-direction(column);
    width: 100%;


    &__v-select {
        border-bottom: 1px solid;
        min-height: 46px;
        direction: rtl;
        font-family: 'KalamehFarsiNumber';
        z-index: 1;
        order: 2;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0px 2px 0px #406080;
        border-radius: 2px;
        border: none;
        font-weight: 400;
        font-size: 16px;
        color: #8593A6;

        & .vs__dropdown-toggle {
            width: 100%;
            height: 100%;
            border: 0;
        }
    }

    &__input-label {
        order: 1;
    }

    &__button {
        @include rectangular-button;
        margin: auto
    }
}
</style>