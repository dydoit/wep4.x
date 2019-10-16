<template>
  <div>
    <Cc></Cc>
    <p>{{id}}</p>
    <img src="../static/images/ai.jpg"/>
  </div>
</template>

<script>
import Cc from './Child'
  export default {
    data() {
      return {
        id: '34'
      }
    },
    components: {Cc}
  }
</script>

<style lang="stylus" scoped>
  div
    font-weight 600
    color red
</style>
