<template>
  <div>
    <ul>
      <li v-for="item in directories[what]" :key="item.href">
        <b-link :to="{name: item.rel, params: {id: extractIdFromHref(item.href)}}">{{ item.value }}</b-link>
      </li>
    </ul>

    <LastUpdated :when="lastUpdated[what]" />
  </div>
</template>

<script>
import path from 'path'
import axios from 'axios'
import LastUpdated from '@/components/LastUpdated'

// Cache directory for 5 minutes (in milliseconds)
// TODO Make this a configuration option and thread it through the app
var fiveMinutes = 5 * 60 * 1000

function orderBy (field) {
  // Sort an array of objects by a given field
  return (a, b) => a[field] > b[field]
}

export default {
  name: 'Directory',
  components: { LastUpdated },
  props: [ 'what' ],
  methods: {
    updateDirectory () {
      var directory = this.what
      var lastUpdated = this.lastUpdated[directory]

      if (!this.directories[directory] || !lastUpdated || Date.now() - lastUpdated > fiveMinutes) {
        // TODO Thread API URL through application, rather than hardcode
        // TODO Be defensive about API endpoint, rather than allow all
        axios.get(`http://localhost:5000/${directory}`).then((response) => {
          if (response.status === 200) {
            this.$set(this.lastUpdated, directory, Date.now())
            this.$set(this.directories, directory, response.data.sort(orderBy('value')))
          }
        })
      }
    },

    extractIdFromHref (href) {
      // This is a bit of an oversight in the API design
      return path.basename(href)
    }
  },
  data () {
    return {
      lastUpdated: {},
      directories: {}
    }
  },
  mounted () { this.updateDirectory() },
  watch: { '$route': 'updateDirectory' }
}
</script>

<style>

</style>
