<template>
  <div id="directory-viewport">
    <b-card id="directory" no-body>
      <b-nav pills slot="header" v-b-scrollspy:directory-scroller>
        <b-nav-item v-for="bin in getBins(what)" :key="bin" :href="`#${binIndex(bin)}`">
          {{ bin }}
        </b-nav-item>
      </b-nav>

      <b-card-body id="directory-scroller">
        <div v-for="bin in getBins(what)" :key="bin">
          <h1 :id="binIndex(bin)" :title="`${directories[what][bin].length} entries`">
            {{ bin }}
          </h1>

          <ul id="directory-list">
            <li v-for="item in directories[what][bin]" :key="item.href">
              <b-link :to="{name: item.rel, params: {id: extractIdFromHref(item.href)}}">
                {{ item.value }}
              </b-link>
            </li>
          </ul>
        </div>
      </b-card-body>
    </b-card>

    <div id="last-updated-container">
      <LastUpdated :when="lastUpdated[what]" />
    </div>

    <!-- TODO Make this a component -->
    <b-modal ref="apiError" centered ok-only hide-header-close title="API Error">
      Could not fetch data from the API server.
    </b-modal>
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
        document.body.style.cursor = 'wait'
        axios.get(`http://localhost:5000/${directory}`)
          .then((response) => {
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
          .catch((error) => {
            // TODO Something better...
            this.$refs.apiError.show()
            console.log(error)
          })
          .then(() => {
            document.body.style.cursor = 'default'
          })
      }
    },

    getBins (directory) {
      return Object.keys(this.directories[directory] || {}).sort()
    },

    binIndex (bin) {
      return 'index-' + (bin === '#' ? 'symbols' : bin)
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
  #directory-viewport {
    height: calc(100vh - 76px);
    overflow: auto;
  }

  #directory {
    height: 100%;
    overflow: auto;
  }

  #directory-scroller {
    height: 500px;
    position: relative;
    overflow-y: scroll;
  }

  #directory-list {
    padding-left: 0px;
    list-style-type: none;
  }

  #last-updated-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 20px;
    font-size: small;
  }
</style>
