<template>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HomeViewmodel from "@/viewmodels/HomeViewmodel"

  export default defineComponent({
    name: 'HomeView',
    emits: [
      'update:setPageTitle'
    ],
    data() {
      return {
        pageTitle: '',
        viewmodel: new HomeViewmodel(),
      }
    },
    mounted() {
      const pageTitle = this.viewmodel?.getIndexTitle();
      this.$emit('update:setPageTitle', pageTitle);
    }
  });
</script>
