import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Directory from '@/components/Directory'

Vue.use(Router)

export default new Router({
  routes: [
    // Directory
    {
      name: 'directory',
      path: '/:what',
      component: Directory,
      props: true
    },

    // Specific group
    {
      name: 'group',
      path: '/groups/:id',
      component: HelloWorld,
      props: true
    },

    // Specific person
    {
      name: 'person',
      path: '/people/:id',
      component: HelloWorld,
      props: true
    }
  ]
})
