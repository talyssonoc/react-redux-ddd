<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script>
  export default {
    props: ['date'],
    computed: {
      formattedDate() {
        return this.date.toLocaleString('en-us', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    }
  };
</script>
