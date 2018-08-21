<template>
  <div>
    <div v-for="bin in Object.keys(directories[what]).sort()" :key="bin">
      <h1 :title="`${directories[what][bin].length} entries`">{{ bin }}</h1>
      <ul>
        <li v-for="item in directories[what][bin]" :key="item.href">
          <b-link :to="{name: item.rel, params: {id: extractIdFromHref(item.href)}}">{{ item.value }}</b-link>
        </li>
      </ul>
    </div>

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

            // Create directory, binned by first letter
            var binned = {}
            response.data.sort(orderBy('value')).forEach((item) => {
              var firstLetter = item.value[0].toUpperCase()
              if (firstLetter < 'A' || firstLetter > 'Z') {
                firstLetter = '#'
              }

              if (!binned.hasOwnProperty(firstLetter)) {
                binned[firstLetter] = []
              }

              binned[firstLetter].push(item)
            })
            this.$set(this.directories, directory, binned)
          }
        })
      }
    },

    // This is a bit of an oversight in the API design
    extractIdFromHref: path.basename
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
