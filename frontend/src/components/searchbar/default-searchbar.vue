<template>
  <!-- Tab links -->
  <div class="searchbar">
    <div class="searhbar__search-section">
      <figure class="searhbar__search-fig">
        <img class="searhbar__search-image" src="@/assets/images/search-normal.png" alt="search" />
      </figure>
      <DefaultTextInput @update:value="search($event)" :="searchInput" />
    </div>
    <hr class="searchbar__seperator" />
    <DefaultTabbar class="searchbar__tabbar" :tabs="tabs" :selestedTabIndex="selestedTabIndex" />
  </div>
</template>
<script>

import defaultSearchResultCards from '@/components/search-result-cards/default-search-result-cards.vue';
import { shallowRef } from 'vue';
import DefaultTabbar from '../tabbar/default-tabbar.vue';
import DefaultTextInput from '@/components/inputs/default-text-input.vue'


export default {
  name: "searchbar",
  components: {
    DefaultTabbar,
    DefaultTextInput
  },
  props: {
  },
  data() {
    return {
      defaultSearchResultCards,
      selestedTabIndex: 0,
      tabs: [],

      searchInput: {
        name: 'search',
        id: 'search',
        placeHolder: [
          'کاوش کنید Advan* +dog -cat ',
        ],
        type: 'text',
      },

    }
  },
  methods: {
    async search(e) {
      let token = localStorage.getItem("accessToken")
      let resp = await fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          query: `query($search:String!){
  searchArticle(title: $search) {
    title
    read_time_minutes
    image_url
  }
  searchTag(name: $search) {
    name
    articles{
      __typename
    }
  }
  searchUser(userName: $search) {
    username
    image_url
      articles{
      __typename
    }
  }
}`,
          variables: {
            search: e
          }
        }),
      })
      let respData = await resp.json()
      const articleTab = {
        header: {
          count: respData.data.searchArticle.length,
          icon: '/src/assets/images/article.png',
          name: 'Article'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: respData.data.searchArticle.map((article) => {
            return {
              icon: article['image_url'],
              title: article['title'],
              description: `${article['read_time_minutes']} دقیقه مطالعه`,
            }
          })
        }
      }
      const tagTab = {
        header: {
          count: respData.data.searchTag.length,
          icon: "/src/assets/images/tag.png",
          name: 'Tag'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: respData.data.searchTag.map((tag) => {
            return {
              icon: "/src/assets/images/tag.png",
              title: tag['name'],
              description:`تعداد مقالات: ${tag['articles'].length}`,
            }
          })
        }
      }

      const userTab = {
        header: {
          count: respData.data.searchUser.length,
          icon: "/src/assets/images/peopel.png",
          name: 'Peopel'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: respData.data.searchUser.map((user) => {
            return {
              icon:  user['image_url'],
              title: user['username'],
              description: `تعداد مقالات: ${user['articles'].length} `,
            }
          })
        }
      }

      const allTab = {
        header: {
          count: [...userTab.body.props,
          ...tagTab.body.props,
          ...articleTab.body.props,].length,
          icon: "/src/assets/images/all.png",
          name: 'All'
        },
        body: {
          component: shallowRef(defaultSearchResultCards),
          props: [...userTab.body.props,
          ...tagTab.body.props,
          ...articleTab.body.props,]
        }
      }

      this.tabs=[allTab,userTab,tagTab,articleTab]

    }
  },
  async mounted() {
    await this.search('')
  
    }

}
</script>
<style lang="scss">
.searchbar {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  align-items: center;
}

.searchbar__tabbar {
  width: 100%;
}

.searhbar__search {
  width: 100%;
  padding: 0 0 1rem 0;
}


.searchbar__seperator {
  width: 100%;
  margin: 0 0 0.5rem 0;
}

.searhbar__search-fig {
  margin: 0;
  align-items: center;
  display: flex;
}

.searhbar__search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.searhbar__search-section .input-box__input-placeholder {
  padding: 0 2.5%;
}

.searhbar__search-section input.input-box__input {
  border: 0;
  padding: 0 2.5%;

  &:focus {
    outline: 0;
  }
}
</style>