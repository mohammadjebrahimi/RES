<template>
  <!-- Tab links -->
  <div class="notificationBar">
    <div class="notificationBar__header">
      <div class="notificationBar__header-right">اعلامیه ها</div>
      <div @click="makeAllNotifAsRead()" class="notificationBar__header-left">همه مطالعه شدند</div>
    </div>
    <hr class="notificationBar__separator" />
    <DefaultTabbar class="notificationBar__tabbar" :tabs="tabs" :selectedTabIndex="selectedTabIndex" />
  </div>
</template>
<script setup lang="ts">

import defaultSearchResultCards from '@/components/search-result-cards/default-search-result-cards.vue'
import { onMounted, ref, shallowRef } from 'vue'
import DefaultTabbar from '@/components/tabbar/default-tabbar.vue'
import { useHeliumStore } from '@/store'
import type { tab } from '@/types/types';


const selectedTabIndex = ref<number>(1)
const tabs = ref<tab[]>([])
const store = useHeliumStore()


const handleNotificationAPI = async (): Promise<void> => {
  let token: string | null = localStorage.getItem("accessToken")
  let resp = await fetch('http://localhost:4000', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    } as HeadersInit | undefined,
    body: JSON.stringify({
      query: `
            query{
    notifications  {
    is_seen
    title
    updated_at
    description
    image_url
  }
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

  const allTab:tab = {
    header: {
      count: respData.data.notifications.length,
      icon: '/src/assets/images/all.png',
      name: 'ALL'
    },
    body: {
      component: shallowRef(defaultSearchResultCards),
      props: respData.data.notifications.map((notification: any) => {

        return {
          icon: notification['image_url'],
          title: notification['title'],
          description: notification['description'],
          is_seen: notification['is_seen'],
        }
      })
    }
  }
  const newTab:tab = {
    header: {
      count: respData.data.notseenNotifs.length,
      icon: "/src/assets/images/new.png",
      name: 'New'
    },
    body: {
      component: shallowRef(defaultSearchResultCards),
      props: respData.data.notseenNotifs.map((notification: any) => {

        return {
          icon: notification['image_url'],
          title: notification['title'],
          description: notification['description'],
          is_seen: notification['is_seen'],
        }
      })
    }
  }

  tabs.value.push(allTab)
  tabs.value.push(newTab)

}
const makeAllNotifAsRead = async () => {
  let token = localStorage.getItem("accessToken")
  let resp = await fetch('http://localhost:4000', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    } as HeadersInit | undefined,
    body: JSON.stringify({
      query: `
          mutation{
  makeAllNotifAsRead{
    __typename
  }
}
`,

    }),
  })
  //remove props & count of new tab so change tab to all tab
  tabs.value[1].body.props = []
  tabs.value[1].header.count = 0
  selectedTabIndex.value = 0
  store.updateShowNotificationAlert(false)
}

onMounted(async () => {
  await handleNotificationAPI()
})

</script>
<style lang="scss">
.notificationBar {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  min-width: 370px;
  align-items: center;
}

.notificationBar__header {
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  align-items: center;
}

.notificationBar__header-right {
  padding: 0 1rem;
  font-weight: 600;
  font-size: 18px;
}

.notificationBar__header-left {
  padding: 0 1rem;
  font-size: 14px;
  color: #28394F;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.notificationBar__tabbar {
  width: 100%;
}

.notificationBar__search {
  width: 100%;
  padding: 0 0 1rem 0;
}


.notificationBar__separator {
  width: 99%;
  margin: 0 0 0.5rem 0;
}

.notificationBar__search-fig {
  margin: 0;
  align-items: center;
  display: flex;
}

.notificationBar__search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.notificationBar__search-section .input-box__input-placeholder {
  padding: 0 2.5%;
}

.notificationBar__search-section input.input-box__input {
  border: 0;
  padding: 0 2.5%;

  &:focus {
    outline: 0;
  }
}
</style>