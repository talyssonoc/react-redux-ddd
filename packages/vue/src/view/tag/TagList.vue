<template>
  <component v-bind:is="listComponent" class="tag-list">
    <component
      v-for="tag in tags"
      v-bind:is="itemComponent"
      v-bind:class="[ 'tag-pill', 'tag-default', tagClassName ]"
      :key="tag"
    >
      {{ tag }}
    </component>
  </component>
</template>

<script>
  export default {
    props: ['as', 'tags', 'tagClassName'],
    computed: {
      listComponent() {
        return this.as || 'div';
      },
      itemComponent() {
        if(this.listComponent === 'ul') {
          return 'li';
        }

        return 'span';
      }
    }
  };
</script>
