<template>
  <div>
    <Nav />
    <slot />
    <Footer />
  </div>
</template>

<script>
  import Nav from './Nav';
  import Footer from './Footer';

  export default {
    components: {
      Nav,
      Footer
    }
  };
</script>
