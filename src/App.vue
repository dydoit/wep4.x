<template>
  <div>
    <p>{{id}}</p>
    <img src="../static/images/ai.jpg">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '002'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  div
    font-weight 600
    color red
</style>
