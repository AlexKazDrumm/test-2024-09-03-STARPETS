<template>
  <header class="flex justify-between items-center py-2 px-8 bg-white shadow-md relative">
    <div class="flex items-center space-x-8">
      <router-link
        to="/"
        :class="[
          'relative inline-block text-[#646464] font-semibold',
          isActiveRoute('/') ? 'active-link' : 'hover:text-black'
        ]"
      >
        Home
      </router-link>
      <router-link
        to="/convert"
        :class="[
          'relative inline-block text-[#646464]',
          isActiveRoute('/convert') ? 'active-link' : 'hover:text-black'
        ]"
      >
        Convert
      </router-link>
    </div>

    <CurrencyDropdown
      :currency="baseCurrency"
      :options="currencies"
      @update:currency="updateBaseCurrency"
    />
  </header>
</template>

<script>
import CurrencyDropdown from './CurrencyDropdown.vue';

export default {
  components: {
    CurrencyDropdown,
  },
  data() {
    return {
      baseCurrency: 'EUR', 
      currencies: ['EUR', 'RUB', 'USD'],
    };
  },
  methods: {
    updateBaseCurrency(newCurrency) {
      this.baseCurrency = newCurrency;
      this.$emit('update-base-currency', this.baseCurrency);
    },
    isActiveRoute(route) {
      return this.$route.path === route;
    },
  },
  mounted() {
    this.$emit('update-base-currency', this.baseCurrency);
  }
};
</script>

<style scoped>
.active-link::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background-color: #FFA500;
}
.router-link {
  position: relative;
}
</style>