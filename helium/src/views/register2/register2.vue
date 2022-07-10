<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SingelCard :showClose="false" :showOk="false">
            <DefaultForm :="formData">
                <DefaultTextInput :="phoneInput" />
                <DefaultTextInput :="nameInput" />
                <DefaultTextInput :="emailInput" />
            </DefaultForm>
        </SingelCard>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import SingelCard from '@/components/cards/singel-card.vue'
import DefaultForm from '@/components/forms/default-form.vue'
import DefaultTextInput from '@/components/inputs/default-text-input.vue'
export default {
    name: "register2-page",
    data() {
        return {
            formData: {
                title: 'شما هنوز در هلیوم ثبت نام نکرده اید.',
                description: 'لطفا اطلاعات زیر را برای ثبت نام کامل کنید.',
                submitText: 'ادامه'
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
            },
            nameInput: {
                name: 'name',
                id: 'name',
                label: 'نام و نام خانوادگی',
                placeHolder: [
                    'نام و نام خانوادگی',
                ],
                type: 'text',
       
            },
            emailInput: {
                name: 'Email',
                id: 'Email',
                label: 'پست الکترونیکی',
                placeHolder: [
                    'مثال:',
                    'example@helium.com'
                ],
                ltr: true,
                type: 'Email',
                required: true,
            },
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
    padding: 0 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }
}
</style>