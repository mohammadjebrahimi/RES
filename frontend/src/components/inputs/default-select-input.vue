<template>
    <div class="select-box">
        <v-select @search="onSearch($event)" v-model="value" :label="optionValue" :reduce="(option) => option"
            :options="options" multiple class="select-box__v-select">
            <template #no-options="{ search, searching, loading }">
                <button @click="btnClicked(search)" class="select-box__button">افزوده شود</button>
            </template>
        </v-select>
        <label :for="id" class="select-box__input-label">{{ label }}</label>
    </div>
</template>
<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
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
        value: Array,
        optionValue: String,
        onSearch: {
            type: Function,
            default: () => { }
        }
    },
    components: { vSelect },
    watch: {
        value() {

            this.$emit('update:value', this.value)
        }
    },
    methods: {
        btnClicked(e) {

            this.$emit('OptionBtnClicked', e)
        }
    }
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