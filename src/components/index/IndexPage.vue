<template>
  <Datatable :datatable=datasource />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Datatable from "@/components/table/Datatable.vue"

export default defineComponent({
  name: 'IndexPage',
  components: {
    Datatable,  
  },
  props: {
    viewmodel:Object,
  },
  data() {
    return {
      datasource: this.viewmodel?.getDatatable(),
    }
  }
})
</script>
