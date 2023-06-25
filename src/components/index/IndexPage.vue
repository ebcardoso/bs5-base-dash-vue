<template>
  <Datatable :viewmodel=viewmodel :alerts="alerts" />
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
    alerts:Array,
  },
  data() {
    return {
      datasource: this.viewmodel?.getDatatable(),
    }
  }
})
</script>
