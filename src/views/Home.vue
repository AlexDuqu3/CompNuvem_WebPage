<template>
  <div class="home" style="text-align:center;">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      style="margin-top:2rem;"
    >
    <HelloWorld msg="Welcome to Your vCard App" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue"

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
