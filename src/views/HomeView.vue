<template>    
  <div class="row g-3 mb-4 align-items-center justify-content-between">
    <div class="col-auto">
      <h1 class="app-page-title mb-0">{{pageTitle}}</h1>
    </div>
  </div><!--//row-->
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HomeViewmodel from "@/viewmodels/HomeViewmodel"

  export default defineComponent({
    name: 'HomeView',
    data() {
      return {
        pageTitle: '',
        viewmodel: new HomeViewmodel(),
      }
    },
    mounted() {
      this.pageTitle = this.viewmodel?.getIndexTitle();
    }
  });
</script>
