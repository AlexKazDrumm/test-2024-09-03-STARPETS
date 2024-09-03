<template>
  <div class="relative inline-block">
    <!-- Текущая выбранная валюта -->
    <div
      @click="toggleDropdown"
      :class="[
        'cursor-pointer bg-[#fafafa] text-[#646464] rounded-lg flex justify-center items-center transition-shadow duration-300',
        'hover:bg-[#f6f6f6] h-full'
      ]"
      :style="{ width: `${inputHeight}px`, height: `${inputHeight}px`, fontSize: '1.25rem' }"
    >
      <span><b>{{ getCurrencySymbol(currency) }}</b></span>
    </div>

    <!-- Варианты валют -->
    <ul
      v-show="dropdownOpen"
      class="absolute bg-white shadow-md mt-2 rounded-lg text-center w-16 z-10"
      :class="dropdownClasses"
    >
      <li
        v-for="option in options"
        :key="option"
        @click="selectCurrency(option)"
        class="px-2 py-1 cursor-pointer hover:bg-gray-100 text-sm"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dropdownOpen: false,
      inputHeight: 0,
    };
  },
  computed: {
    dropdownClasses() {
      return 'left-1/2 transform -translate-x-1/2';
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.setInputHeight();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectCurrency(option) {
      this.$emit('update:currency', option);
      this.dropdownOpen = false;
    },
    getCurrencySymbol(currency) {
      const symbols = {
        USD: '$',
        EUR: '€',
        RUB: '₽',
      };
      return symbols[currency];
    },
    handleClickOutside(event) {
      const dropdown = this.$el;
      if (!dropdown.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
    setInputHeight() {
      this.inputHeight = this.$el.closest('.flex').querySelector('input')?.offsetHeight || 40;
    }
  }
};
</script>