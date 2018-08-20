import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // Group overview and landing page
    {
      name: 'groups',
      path: '/',
      redirect: '/groups',
      component: HelloWorld
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
      component: HelloWorld
    },

    // Specific person
    {
      name: 'person',
      path: '/people/:id',
      component: HelloWorld
    }
  ]
})
