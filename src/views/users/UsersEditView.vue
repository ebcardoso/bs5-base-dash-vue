<template>
  <Form 
    @save-form="editModel" 
    :viewmodel=viewmodel 
    :modelFields=model />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UsersViewmodel from '@/viewmodels/UsersViewmodel'
import Form from '@/components/form/Form.vue'
import { User } from '@/models/User'

export default defineComponent({
  name: 'UsersEditView',
  components: {
    Form
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
    const pageTitle = this.viewmodel?.getTitleEdit();
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
    },
    async editModel() {
      await this.viewmodel?.editModel(this.model).then(() => {
        this.viewmodel?.createAlert(
          this.alerts,
          'success',
          '',
          'User updated successfully.'
        );
        const destination_route = this.viewmodel?.getRouteIndex();
        this.$router.push({ name: destination_route });
      }).catch(() => {
        this.viewmodel?.createAlert(
          this.alerts,
          'danger',
          'Failure: ',
          'Error to update user'
        );
      });
    }
  }
})
</script>
