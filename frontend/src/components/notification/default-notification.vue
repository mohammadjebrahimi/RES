<template>
  <VDropdown :distance="0" class="notification">
    <!-- This will be the popover reference (for the events and position) -->
    <div class="notification__figure">
      <img class="notification__image" src="@/assets/images/notification.png" alt="notification" />
      <div v-if="store.showNotificationAlert" class="notification__alert"></div>
    </div>

    <!-- This will be the content of the popover -->
    <template #popper>

      <DefaultNotificationbar />

    </template>
  </VDropdown>
</template>
<script setup>
import {
  Dropdown as VDropdown,
} from 'floating-vue'
import DefaultNotificationbar from '../notificationbar/default-notificationbar.vue';
import sse from '@/mixins/sse.js'
import { useHeliumStore } from '@/store'
import { onMounted } from 'vue';


defineProps({
  currentUser: Object
})

const store = useHeliumStore()


const  handleNotificationAPI = async () => {

  let token = localStorage.getItem("accessToken")
  let resp = await fetch('http://localhost:4000', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      query: `
            query{

  notseenNotifs:notifications(is_seen:false) {
    is_seen
    title
    updated_at
    description
    image_url
  }
}
`,

    }),
  })
  let respData = await resp.json()
  if (respData.data.notseenNotifs.length) {
    store.updateShowNotificationAlert(true)

  } else {
    store.updateShowNotificationAlert(false)

  }

}
const subscribeNotification = () => {
  sse({
    query:/* GraphQL */ `subscription ($token: String!) {
  newNotification(token: $token){
 title
    description
  }
}`, variables: { token: localStorage.getItem("accessToken") }, CLB: (e) => { console.log(e); store.updateShowNotificationAlert(true) }
  })
}
onMounted(() => {
  subscribeNotification()
  handleNotificationAPI()
  })


</script>
<style lang="scss">
.notification {
  align-items: center;
  display: flex;
  cursor: pointer;


  &__image {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }

  &__alert {
    background: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
    top: -33px;
  }

  &__figure {
    height: 24px;
  }

}
</style>