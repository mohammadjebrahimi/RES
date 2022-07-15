<template>
    <Form @submit="submit($event)" :validationSchema="schema" :action="action" class="form">
        <div class="form__detail">
            <h3 class="form__title">{{ title }}</h3>
            <p class="form__description">{{ description }}</p>
        </div>
        <div class="form__input-container">
            <slot></slot>
        </div>

        <button v-if="submitText" class="form__submit" :class="{ ' form__submit--align-end': alignToEnd }">
            {{ submitText }}
        </button>
    </Form>
</template>
<script>
import { Form } from 'vee-validate';
export default {
    props: {
        schema: Object,
        action: String,
        title: String,
        description: String,
        submitText: String,
        alignToEnd: {
            type: Boolean,
            default: false
        }
    },
    components: { Form },
    methods: {
        submit(e) {
            this.$emit('submitForm', e)
        },


    }
}
</script>
<style lang="scss">
.form {
    @include flex-direction(column);
    align-items: center;
    gap: 47px;
    padding: 0px;

    &__title {
        font-weight: 700;
        margin: 0;
    }

    &__detail {
        @include flex-direction(column);
        justify-content: center;
        align-items: center;
    }

    &__description {
        font-weight: 600;
        color: #8593A6;
        margin: 0;
    }

    &__input-container {
        @include flex-direction();
        gap: 36px;
        width: 100%;
        flex-wrap: wrap;

        @include breakpoint_max(medium) {
            @include flex-direction(column);
        }


    }

    &__submit {
        @include rectangular-button();

        &--align-end {
            align-self: end
        }
    }

}
</style>