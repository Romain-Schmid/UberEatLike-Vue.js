<template>
  <div>
    <b-button id="side-button" v-b-toggle.sticky-sidebar>Menu</b-button>
    <b-sidebar id="sticky-sidebar" title="Sidebar">
      <div class="sticky-top">
        <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item>Active</b-nav-item>
            <b-nav-item href="#link-1">Link</b-nav-item>
            <b-nav-item href="#link-2">Another Link</b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  /*props: {
    key: String,
  },*/
};
</script>

<style scoped>
#side-button {
  margin-top: -10px;
}
</style>
