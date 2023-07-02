<template>
  <label class="form-label"> {{fieldLocals?.label}} </label>
  <select class="form-select form-control" 
          :value="modelValue"
          @input="emitValue" 
          :required="fieldLocals?.required">
    <option v-for="(option, index) in options" 
            :key="index" 
            :value="option[0]"
            :selected="isSelected(option[0])">
      {{option[1]}}
    </option>
  </select>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectField',
  props: {
    fieldLocals:Object,
    modelValue:String
  },
  emits: ['update:inputSelectValue'],
  data() {
    return {
      options: [] as Array<Array<any>>
    }
  },
  mounted() {
    if (this.fieldLocals?.fromApi==true) {
      this.fieldLocals?.options.then((response:AxiosResponse) => {
        var results = response.data.results;
        results.forEach((value:any) => {
          this.options.push([value?.id, value?.name]);
        }); 
      });
    } else {
      this.options = this.fieldLocals?.options;
    }
  },
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
