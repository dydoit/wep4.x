<template>
  <div>
    <p>{{id}}</p>
    <el-input></el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '34'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  div
    font-weight 600
    color red
    border 1px solid red
</style>
