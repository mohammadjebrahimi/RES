<template>
  <section class="success-register">
    <figure class="success-register__fig">
      <img src="@/assets/images/Group 284.png" alt="register done">
    </figure>
    <p class="success-register__text">ثبت نام شما با موفقیت انجام شد.</p>
    <button class="success-register__submit" @click="goToSignUpPage()">ورود به سایت</button>
  </section>
</template>
<script setup lang="ts">
type emitShape = {
  (e: 'btnClicked'): void
}
const emit = defineEmits<emitShape>()
const goToSignUpPage = (): void => {
  emit('btnClicked')
}

</script>
<style lang="scss">
.success-register {
  @include flex-direction(column);
  justify-content: center;
  align-items: center;

  &__submit {
    @include rectangular-button()
  }
}
</style>