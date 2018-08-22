<template>
  <div class="last-updated text-muted" :title="updateTime">Last updated {{ fuzzyDuration() }}</div>
</template>

<script>
let timer = null

export default {
  name: 'LastUpdated',
  props: [ 'when' ],
  data () {
    return { now: Date.now() }
  },
  computed: {
    updateTime () {
      return Date(this.when)
    }
  },
  methods: {
    fuzzyDuration () {
      if (isNaN(this.when)) {
        return '...'
      }

      // Duration in minutes
      var delta = (this.now - this.when) / 60000

      if (delta < 1) {
        return 'just now'
      } else {
        var minutes = Math.floor(delta)
        return `${minutes} minute` +
               (minutes === 1 ? '' : 's') +
               ' ago'
      }
    }
  },
  created () {
    timer = setInterval(() => { this.now = Date.now() }, 20000)
  },
  destroyed () {
    clearInterval(timer)
  }
}
</script>

<style>
  div.last-updated {
    text-align: right;
    margin: 0.5em 0em 0em 0em;
    font-size: small;
  }
</style>
