<template>
    <div class="input-box" @input="input($event)">
        <input @input="input($event)" :name="name" placeholder=" " class="input-box__input"
          :class="{ 'input-box__input--direction-ltr': ltr }" :type="type" :id="id" :required="required">
          
        <label :for="id" class="input-box__input-label">{{ label }}</label>
        <div class="input-box__input-placeholder">
            <span v-for="(data, index) in placeHolder " :key="`place-${index}`">{{ data }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        id: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default:false
        },
        label: String,
        placeHolder: Array,
        ltr: {
            type: Boolean,
            default: false
        },
        type: String,
        value: String,
    },
    methods: {
        input(e) {
            this.$emit('update:value', e.target.value)
        }
    }
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
    }

    &__input {
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


}
</style>