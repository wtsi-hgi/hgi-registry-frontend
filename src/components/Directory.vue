<template>
  <p>
    Hello {{ what }}
  </p>
</template>

<script>
import Router from 'vue-router'

export default {
  name: 'Directory',
  props: [ 'what' ]
}
</script>

<style>

</style>
