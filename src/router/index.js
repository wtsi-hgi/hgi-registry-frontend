import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Directory from '@/components/Directory'

Vue.use(Router)

export default new Router({
  routes: [
    // Group overview and landing page
    {
      name: 'groups',
      path: '/groups',
      alias: '/',
      component: Directory,
      props: { what: 'groups' }
    },

    // Specific group
    {
      name: 'group',
      path: '/groups/:id',
      component: HelloWorld
    },

    // People overview
    {
      name: 'people',
      path: '/people',
      component: Directory,
      props: { what: 'people' }
    },

    // Specific person
    {
      name: 'person',
      path: '/people/:id',
      component: HelloWorld
    }
  ]
})
