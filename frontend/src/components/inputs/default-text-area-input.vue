<template>
    <div class="textarea" @input="input($event)">

        <Field as="textarea" @input="input($event)" :name="name"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' placeholder=" "
            class="textarea__input"
            :class="{ 'textarea__input--direction-ltr': ltr, 'textarea__input--error': errorMessage }" :id="id"
            :required="required" />

        <label :for="id" v-if="label" class="textarea__input-label">{{ label }}</label>

        <div class="textarea__input-placeholder">
            <span v-for="(data, index) in placeHolder " :key="`place-${index}`">{{ data }}</span>
        </div>
        <ErrorMessage class="textarea__error" :name="name" />
    </div>
</template>
<script setup lang="ts">
import type { textInput } from '@/types/types';
import { Field, ErrorMessage, useField } from 'vee-validate';
import { toRefs } from 'vue';

type emitShape = {
    (e: 'update:value', eventTargetValue: string): void
}
const props = withDefaults(defineProps<textInput>(), {
    required: false,
    ltr: false
})
const { name, value } = toRefs(props)
const errorMessage = useField(name, undefined, {
    initialValue: value,
}).errorMessage
const emit = defineEmits<emitShape>()
const input = (e: Event):void => {
    const eventTargetValue = (e.target as HTMLInputElement).value
    emit('update:value', eventTargetValue)
}
</script>
<style lang="scss">
.textarea {
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
        resize: none;
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

        &:not(:placeholder-shown)~.textarea__input-placeholder {
            display: none;
        }

        &:required~.textarea__input-label:after {
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