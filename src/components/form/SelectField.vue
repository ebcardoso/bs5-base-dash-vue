<template>
  <label class="form-label"> {{fieldLocals?.label}} </label>
  <select class="form-select form-control" 
          :value="modelValue"
          @input="emitValue" 
          :required="fieldLocals?.required">
    <option v-for="(option, index) in fieldLocals?.options" 
            :key="index" 
            :value="option[0]"
            :selected="isSelected(option[0])">
      {{option[1]}}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectField',
  props: {
    fieldLocals:Object,
    modelValue:String
  },
  emits: ['update:inputSelectValue'],
  methods: {
    emitValue(e:any) {
      let value = e.target?.value;
      this.$emit('update:inputSelectValue', value);
    },
    isSelected(option:any) {
      if (option==this.modelValue) {
        return true;
      } else { 
        return false;
      }
    }
  }
})
</script>
