<template>
  <span v-if="isLoading">Loading tags...</span>
  <span v-else-if="error">Error while loading tags.</span>
  <TagList v-else v-bind="listProps" />
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { TAG } from '@/state/mutationTypes';
  import TagList from './TagList';

  export default {
    methods: {
      ...mapActions({
        loadPopularTags: TAG.LOAD_POPULAR_TAGS
      })
    },

    computed: {
      listProps() {
        return {
          tags: this.tags,
          ...this.$props
        };
      },
      ...mapState({
        tags: (state) => state.tags.tags,
        isLoading: (state) => state.tags.isLoading,
        error: (state) => state.tags.error
      })
    },

    mounted() {
      this.loadPopularTags();
    },

    components: {
      TagList
    }
  };
</script>
