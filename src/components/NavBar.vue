<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand>HGI Registry</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="groups">Groups</b-nav-item>
        <b-nav-item to="people">People</b-nav-item>
      </b-navbar-nav>

      <!-- TODO: Add search as a future enhancement...
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
      -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default { name: 'NavBar' }
</script>
