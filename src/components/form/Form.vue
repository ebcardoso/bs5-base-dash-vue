<template>
  <div v-for="(alert, index) in viewmodel?.getAlertMessages()" :key="index" :class="['alert', `alert-${alert?.type}`, 'alert-dismissible', 'fade', 'show']" role="alert">
    <strong>{{alert?.title}}</strong>{{alert?.message}}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>

  <form class="settings-form" @submit.prevent="submitForm">
    <div class="row">
      <div v-for="(group, index) in viewmodel?.fieldGroups()" :key="index" :class="['col-12', `col-md-${columnSize}`]">
        <div class="app-card app-card-settings shadow-sm p-4">
          <div class="col-auto">
            <h3 class="app-card-title">{{group.title}}</h3>
          </div>
          <!--//col-->
          <hr/>
          <div v-for="(field, index2) in (group.fields)" :key="index2" :class="['mb-3', field.type==='boolean' ? 'form-check' : '']">
            <BooleanField v-if="field.type === 'boolean'"
              :modelValue="modelFields[field.name]"
              @update:inputBooleanValue="newValue => modelFields[field.name] = newValue"
              :fieldLocals=field />
            <DateField v-else-if="field.type === 'date'"
              @update:inputDateValue="newValue => modelFields[field.name] = newValue"
              :modelValue="modelFields[field.name]"
              :fieldLocals=field
              />
            <PasswordField v-else-if="field.type === 'password'"
              :modelValue="modelFields[field.name]"
              @update:inputPasswordValue="newValue => modelFields[field.name] = newValue"
              :fieldLocals=field />
            <SelectField v-else-if="field.type === 'select'"
              :modelValue="modelFields[field.name]"
              @update:inputSelectValue="newValue => modelFields[field.name] = newValue"
              :fieldLocals=field />
            <TextField v-else
              :modelValue="modelFields[field.name]"
              @update:inputTextValue="newValue => modelFields[field.name] = newValue"
              :fieldLocals=field />
          </div>
        </div>
        <!--//app-card-->
        <br/>
      </div>     
    </div>
    
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="app-card app-card-settings shadow-sm p-4">
          <div class="app-card-body">
            <div class="row justify-content-between">
              <div class="col-auto">
                <router-link :to="{name: viewmodel?.getRouteIndex()}" class="btn app-btn-secondary">
                  Return
                </router-link>                
              </div>
              <div class="col-auto">
                <button type="submit" class="btn app-btn-primary">Save</button>
              </div>
            </div>
          </div>
          <!--//app-card-body-->
        </div>
        <!--//app-card-->
      </div>
    </div>
  </form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BooleanField from '@/components/form/BooleanField.vue';
import DateField from '@/components/form/DateField.vue';
import PasswordField from '@/components/form/PasswordField.vue';
import SelectField from '@/components/form/SelectField.vue';
import TextField from '@/components/form/TextField.vue';

export default defineComponent({
  name: 'Form',
  components: {
    BooleanField,
    DateField,
    PasswordField,
    SelectField,
    TextField
  },
  props: {
    viewmodel:Object,
    modelFields:Object
  },
  emits: ['saveForm'],
  data() {
    return {
      columnSize: 12/this.viewmodel?.fieldGroups().length
    }
  },
  methods: {
    submitForm() {
      this.$emit('saveForm');     
    },
  }
})
</script>
