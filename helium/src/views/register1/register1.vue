<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm :="formData">
                <DefaultTextInput :="phoneInput" />
            </DefaultForm>
        </SingelCard>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import SingelCard from '@/components/cards/singel-card.vue'
import DefaultForm from '../../components/forms/default-form.vue'
import DefaultTextInput from '../../components/inputs/default-text-input.vue'
export default {
    name: "register1-page",
    data() {
        return {
            formData: {
                title: 'ورود/ثبت نام',
                description: '',
                submitText:'ادامه'
            },
            phoneInput: {
                name: 'Phon-Number',
                id: 'Phon-Number',
                label: 'لطفا شماره تلفن همراه خود را وارد کنید',
                placeHolder: [
                    'مثال:',
                    '۰۹۱۵۱۲۳۴۵۶۷'
                ],
                ltr: true,
                type: 'tel',
                required:false
            }
        }

    },
    components: {
        defaultHeader,
        defaultFooter,
        SingelCard,
        DefaultForm,
        DefaultTextInput
    },
}
</script>
<style lang="scss" scoped>
.main {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    padding: 1em;
    margin-top: 63px;
    flex-grow: 1;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>