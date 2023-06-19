<template>
  <ShowPage :model=model :viewmodel=viewmodel />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShowPage from "@/components/show/ShowPage.vue"
import ProfileViewmodel from '@/viewmodels/ProfileViewmodel'
import { User } from '@/models/User';

export default defineComponent({
  name:'ProvileView',
  components: {
    ShowPage,
  },
  data() {
    return {
      viewmodel: new ProfileViewmodel(),
      model: {} as User
    }
  },
  mounted() {
    this.setModel();
  },
  methods: {
    async setModel() {
      await this.viewmodel?.findMyProfile().then(response => {
        this.model = response.data;
      });
      // .catch(() => {
      //   const destination_route = this.viewmodel?.getRouteIndex();
      //   this.$router.push({ name: destination_route });
      // });
    }
  }
})
</script>
