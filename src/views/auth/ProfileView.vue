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
  emits: [
    'update:setPageTitle'
  ],
  data() {
    return {
      viewmodel: new ProfileViewmodel(),
      model: {} as User
    }
  },
  mounted() {
    const pageTitle = this.viewmodel?.getTitleShow();
    this.$emit('update:setPageTitle', pageTitle);

    this.setModel();
  },
  methods: {
    async setModel() {
      await this.viewmodel?.findMyProfile().then(response => {
        this.model = response.data;
      }).catch(() => {
        this.viewmodel?.alertMessages.push({
          title: 'Failure: ',
          message: "Error on loading user's profile",
          type: 'danger' //success, warning or danger
        });
      });
    }
  }
})
</script>
