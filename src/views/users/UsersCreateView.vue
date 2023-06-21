<template>
  <Form 
    @save-form="saveModel" 
    :viewmodel=viewmodel 
    :modelFields=model />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UsersViewmodel from "@/viewmodels/UsersViewmodel"
import Form from '@/components/form/Form.vue'
import { User } from '@/models/User'

export default defineComponent({
  name: 'UsersCreateView',
  components: {
    Form,
  },
  emits: [
    'update:setPageTitle'
  ],
  data() {
    return {
      viewmodel: new UsersViewmodel(),
      model: { } as User
    }
  },
  mounted() {
    const pageTitle = this.viewmodel?.getTitleCreate();
    this.$emit('update:setPageTitle', pageTitle);
  },
  methods: {
    async saveModel() {
      await this.viewmodel?.saveModel(this.model).then(() => {
        const destination_route = this.viewmodel?.getRouteIndex();
        this.$router.push({ name: destination_route });
      }).catch(() => {
        this.viewmodel?.alertMessages.push({
          title: 'Failure: ',
          message: 'Error on create user',
          type: 'danger' //success, warning or danger
        });
      });
    }
  }
})
</script>
