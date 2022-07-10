<template>
    <div class="select-box">
        <select @change="selectItem($event)" :placeholder="placeHolder" class="select-box__select-option"
            :class="{ 'select-box__select-option--direction-ltr': ltr }" :id="id">
            <option v-if="value == ''" value="" :key='`option`' selected>انتخاب کنید</option>
            <template v-for="(option, index) in options">
                <option v-if="option.key == value" :value="option.key" :key='`option-${index}`' selected>{{ option.value
                }} </option>
                <option v-else :value="option.key" :key='`selectedOption-${index}`'>{{ option.value
                }} </option>
            </template>
        </select>
        <label :for="id" class="select-box__input-label">{{ label }}</label>
    </div>
</template>
<script>
export default {
    props: {
        options: Array,
        name: String,
        id: {
            type: String,
            required: true
        },
        label: String,
        placeHolder: String,
        ltr: {
            type: Boolean,
            default: false
        },
        value: String,
    },
    methods: {
        selectItem(e) {
            this.$emit('update:value', e.target.value)
        }
    },

}
</script>
<style lang="scss">
.select-box {
    @include flex-direction(column);
    width: 100%;


    &__select-option {
        border-bottom: 1px solid;
        height: 46px;
        padding: 0 5%;
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

        &:required~.select-box__input-label::after {
            content: "*";
        }
    }

    &__select-option--direction-ltr {
        direction: ltr;
    }

    &__input-label {
        order: 1;
    }


}
</style>