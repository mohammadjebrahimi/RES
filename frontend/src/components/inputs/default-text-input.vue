<template>
    <div class="input-box" @input="input($event)">
        <Field @input="input($event)" :name="name" placeholder=" " class="input-box__input"
            :class="{ 'input-box__input--direction-ltr': ltr, 'input-box__input--error': errorMessage }" :type="type"
            :id="id" :required="required" />

        <label :for="id" v-if="label" class="input-box__input-label">{{ label }}</label>

        <div class="input-box__input-placeholder">
            <span v-for="(data, index) in placeHolder " :key="`place-${index}`">{{ data }}</span>
        </div>
        <ErrorMessage class="input-box__error" :name="name" />
    </div>
</template>
<script setup lang="ts">

import type { textInput } from '@/types/types';
import { Field, ErrorMessage, useField } from 'vee-validate';
import { toRefs } from 'vue';

type emitShape = {
    (e: 'update:value', eventTargetValue: string): void
}

const emit = defineEmits<emitShape>()
const props = withDefaults(defineProps<textInput>(), {
    required: false,
    ltr: false
})
const { name, value } = toRefs(props)
const errorMessage = useField(name, undefined, {
    initialValue: value,
}).errorMessage


const input = (e:Event) => {
    emit('update:value', (e.target as HTMLInputElement).value)
}
</script>
<style lang="scss">
.input-box {
    @include flex-direction(column);
    position: relative;
    width: 100%;


    &__input-placeholder {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        width: 90%;
        padding: 0 5%;
        z-index: 0;
        height: 46px;
        align-items: center;
        opacity: 0.5;
        order: 3;
    }

    &__error {
        font-size: 11px;
        order: 4;
        color: #E53222;
        position: absolute;
        bottom: -1.1rem;
        font-weight: 600;
    }

    &__input {
        outline: none;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid;
        border-radius: 2px;
        height: 46px;
        padding: 0 5%;
        direction: rtl;
        font-family: KalamehFarsiNumber;
        z-index: 1;
        order: 2;

        &:not(:placeholder-shown)~.input-box__input-placeholder {
            display: none;
        }

        &:required~.input-box__input-label:after {
            content: "*";
        }

    }

    &__input-label {
        order: 1;
    }

    &__input--direction-ltr {
        direction: ltr;
    }

    &__input--error {
        border-bottom: 3px solid #E53222;
    }

}
</style>