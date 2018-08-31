<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <Feed v-bind:feed="feed" />

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <PopularTagList />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { FEED } from '@/state/mutationTypes';
  import Feed from '../article/Feed';
  import PopularTagList from '../tag/PopularTagList';

  export default {
    methods: {
      ...mapActions({
        loadGlobalFeed: FEED.LOAD_GLOBAL_FEED
      })
    },

    computed: mapState({
      feed: (state) => state.feed
    }),

    mounted() {
      this.loadGlobalFeed();
    },

    components: {
      Feed,
      PopularTagList
    }
  };
</script>
