<template>
  <VDropdown :distance="0" class="member">
    <!-- This will be the popover reference (for the events and position) -->
    <img class="member__image" :src="currentUser.image_url" alt="admin" />


    <!-- This will be the content of the popover -->
    <template #popper>
      <div class="member__options">
        <RouterLink class="member__option" :to="{ name: 'profile' }">پروفایل</RouterLink>
        <RouterLink class="member__option" :to="{ name: 'story-writing-add' }">ساخت مقاله</RouterLink>
        <RouterLink @click="logout" class="member__option member__option--logout" :to="{ name: 'register' }">خروج
        </RouterLink>
      </div>


    </template>
  </VDropdown>
</template>
<script>
import {
  Dropdown,
} from 'floating-vue'
import { RouterLink } from 'vue-router';
import { useHeliumStore } from '@/store'
export default {
  name: "profile",
  components: {
    Dropdown,
    RouterLink
  },
  props: {
    currentUser: Object
  },
  methods: {
    logout() {
      const store = useHeliumStore()
      localStorage.removeItem("accessToken");
      store.setCurrentUser({})
    }
  }

}
</script>
<style lang="scss">
.member {
  height: 42px;
  width: 42px;
  cursor: pointer;
  &__options {
    @include flex-direction(column);
    list-style-type: none;
    padding: 0;

  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__option {
    padding: 0.25rem 1rem;
    border-bottom: 1px solid black;
    text-decoration: none;
    color: black;

    &--logout {
      color: red;
      border-bottom: 0
    }
  }
}</style>