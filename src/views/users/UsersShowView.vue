<template>
  <ShowPage :model=model :viewmodel=viewmodel />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShowPage from "@/components/show/ShowPage.vue"
import UsersViewmodel from "@/viewmodels/UsersViewmodel"
import { User } from '@/models/User';

export default defineComponent({
  name: 'UsersShowView',
  components: {
    ShowPage,
  },
  props: {
    alerts:Array,
  },
  emits: [
    'update:setPageTitle'
  ],
  data() {
    return {
      viewmodel: new UsersViewmodel(),
      model_id: '',
      model: {} as User
    }
  },
  mounted() {
    const pageTitle = this.viewmodel?.getTitleShow();
    this.$emit('update:setPageTitle', pageTitle);
    
    this.model_id = this.$route?.params?.id as string;
    this.setModel(this.model_id);
  },
  methods: {
    async setModel(id:string) {
      await this.viewmodel?.findModel(id).then(response => {
        this.model = response.data;
        console.log(this.model);
      }).catch(() => {
        this.viewmodel?.createAlert(
          this.alerts,
          'danger',
          'Failure: ',
          'Error to load user'
        );
        const destination_route = this.viewmodel?.getRouteIndex();
        this.$router.push({ name: destination_route });
      });
    }
  }
})
</script>
