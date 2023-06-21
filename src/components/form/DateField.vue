<template>
  <label class="form-label"> {{fieldLocals?.label}} </label>
  <input type="date" class="form-control" :value="modelValue" @input="emitValue" :required="fieldLocals?.required" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateField',
  props: {
    fieldLocals:Object,
    modelValue:String
  },
  emits: ['update:inputDateValue'],
  methods: {
    emitValue(e:any) {
      let value = e.target?.value;
      this.$emit('update:inputDateValue', value);
    }
  } 
})
</script>
