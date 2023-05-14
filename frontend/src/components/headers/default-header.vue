<template>
    <header class="header">
        <div class="header__container">
            <default-brand />
            <div class="header__left">
                <slot>
                    <search/>
                    <img class="header__notification" src="@/assets/images/notification.png" alt="notification" />
                    <member :currentUser="store.currentUser" class="header__member" />
                </slot>
            </div>
        </div>
    </header>
</template>
<script>
import DefaultBrand from "@/components/brands/default-brand.vue";
import member from '@/components/member/default-member.vue'
import search from '@/components/search/default-search.vue'
import { useHeliumStore } from '@/store'
export default {
    name: "default-header",
    components: {
        DefaultBrand,
        member,
        search
    },
    data() {
        return {
            store: useHeliumStore()
        }
    }
}
</script>
<style lang="scss" >
.header {
    @include flex-direction();
    background-color: $headColor;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 1920px;
    height: 65px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

    &__container {
        @include flex-direction();
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        padding: 0 1em;
    }

    &__left {
        @include flex-direction();
        gap: 10px;
        align-items: center;
    }

    &__search {
        height: fit-content;
    }


    &__button {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: $primaryColor;
        border: 1px solid rgba(36, 52, 71, 0.15);
        border-radius: 4px;
        padding: 8px 24px;
    }
}
</style>