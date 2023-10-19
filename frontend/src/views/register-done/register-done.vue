<template>
    <main class="main">
        <default-header class="main__header">
        </default-header>
        <nav></nav>
        <SuccessRegister @btnClicked="redirect()" />
    </main>
    <default-footer />
</template>
<script setup>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import SuccessRegister from './components/success-register.vue'
import { useRouter } from 'vue-router';

const router = useRouter()


const redirect = () => {
    router.push({ name: 'login' })
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