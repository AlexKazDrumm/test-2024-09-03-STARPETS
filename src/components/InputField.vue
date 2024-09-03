<template>
  <div class="relative">
    <div class="flex items-center space-x-2">
      <input
        :type="type"
        :value="modelValue"
        @input="validateAndUpdate($event.target.value)"
        :class="[
          'p-3 rounded-lg w-full border-2 transition-shadow duration-300',
          error ? 'border-red-500 focus:shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-gray-300 focus:border-orange-500 focus:shadow-[0_0_8px_rgba(255,165,0,0.5)]',
          'outline-none'
        ]"
        :readonly="readonly"
      />
      <slot></slot> 
    </div>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ errorText }}</p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: 'Required field',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    validateAndUpdate(value) {
      
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value)) {
        this.$emit('update:modelValue', value);
        this.$emit('input-error', false);
      } else {
        this.$emit('input-error', true);
        this.$emit('update:modelValue', value);
      }
    },
  },
};
</script>
