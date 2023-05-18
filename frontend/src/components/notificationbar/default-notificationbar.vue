<template>
  <!-- Tab links -->
  <div class="notificationbar">
    <div class="notificationbar__header">
      <div class="notificationbar__header-right">اعلامیه ها</div>
      <div @click="makeAllNotifAsRead()" class="notificationbar__header-left">همه مطالعه شدند</div>
    </div>
    <hr class="notificationbar__seperator" />
    <DefaultTabbar class="notificationbar__tabbar" :tabs="tabs" :selestedTabIndex="selestedTabIndex" />
  </div>
</template>
<script>

import defaultSearchResultCards from '@/components/search-result-cards/default-search-result-cards.vue';
import { shallowRef } from 'vue';
import DefaultTabbar from '../tabbar/default-tabbar.vue';
import DefaultTextInput from '@/components/inputs/default-text-input.vue'
import { useHeliumStore } from '@/store'

export default {
  name: "notificationbar",
  components: {
    DefaultTabbar,
    DefaultTextInput
  },
  props: {
  },
  data() {
    return {
      defaultSearchResultCards,
      selestedTabIndex: 1,
      tabs: [],
      store: useHeliumStore()
    }
  },
  methods: {
    async handleNotificationAPI() {
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

      const allTab = {
        header: {
          count: respData.data.notifications.length,
          icon: '/src/assets/images/all.png',
          name: 'ALL'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: respData.data.notifications.map((notification) => {
       
            return {
              icon: notification['image_url'],
              title: notification['title'],
              description: notification['description'],
              is_seen: notification['is_seen'],
            }
          })
        }
      }
      const newTab = {
        header: {
          count: respData.data.notseenNotifs.length,
          icon: "/src/assets/images/new.png",
          name: 'New'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: respData.data.notseenNotifs.map((notification) => {
    
            return {
              icon: notification['image_url'],
              title: notification['title'],
              description: notification['description'],
              is_seen: notification['is_seen'],
            }
          })
        }
      }

      this.tabs = [allTab, newTab]

    },
    async makeAllNotifAsRead() {
      let token = localStorage.getItem("accessToken")
      let resp = await fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
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
      this.tabs[1].body.props = []
      this.tabs[1].header.count = 0
      this.selestedTabIndex = 0
      this.store.updateShowNotificationAlert(false)
    }
  },
  async mounted() {
    await this.handleNotificationAPI()

  }

}
</script>
<style lang="scss">
.notificationbar {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  min-width: 370px;
  align-items: center;
}

.notificationbar__header {
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  align-items: center;
}

.notificationbar__header-right {
  padding: 0 1rem;
  font-weight: 600;
  font-size: 18px;
}

.notificationbar__header-left {
  padding: 0 1rem;
  font-size: 14px;
  color: #28394F;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.notificationbar__tabbar {
  width: 100%;
}

.notificationbar__search {
  width: 100%;
  padding: 0 0 1rem 0;
}


.notificationbar__seperator {
  width: 99%;
  margin: 0 0 0.5rem 0;
}

.notificationbar__search-fig {
  margin: 0;
  align-items: center;
  display: flex;
}

.notificationbar__search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.notificationbar__search-section .input-box__input-placeholder {
  padding: 0 2.5%;
}

.notificationbar__search-section input.input-box__input {
  border: 0;
  padding: 0 2.5%;

  &:focus {
    outline: 0;
  }
}
</style>