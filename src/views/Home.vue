<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Exchange rates against {{ baseCurrency }}</h1>
    <Loader v-if="loading" />
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CardComponent
        v-for="(rate, currency) in filteredRates"
        :key="currency"
      >
        <p class="text-xl font-semibold">1 {{ baseCurrency }}</p>
        <p class="text-2xl font-bold">{{ rate }}</p>
        <p class="text-gray-500">{{ currency }}</p>
      </CardComponent>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';
import CardComponent from '../components/CardComponent.vue';
import { fetchCurrencyRates } from '../services/currencyService';

export default {
  props: ['baseCurrency'],
  data() {
    return {
      rates: {},
      loading: false,
    };
  },
  watch: {
    baseCurrency: 'fetchRates',
  },
  created() {
    this.fetchRates();
  },
  computed: {
    filteredRates() {
      const allowedCurrencies = ['RUB', 'USD', 'EUR'];
      return Object.keys(this.rates)
        .filter(currency => allowedCurrencies.includes(currency) && currency !== this.baseCurrency)
        .reduce((filtered, currency) => {
          filtered[currency] = this.rates[currency];
          return filtered;
        }, {});
    }
  },
  methods: {
    async fetchRates() {
      this.loading = true;
      this.rates = this.calculateRates(await fetchCurrencyRates());
      this.loading = false;
    },
    calculateRates(data) {
      const rates = {};
      const baseCurrencyLower = this.baseCurrency.toLowerCase();
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith(baseCurrencyLower)) {
          const targetCurrency = key.split('-')[1].toUpperCase();
          if (['RUB', 'USD', 'EUR'].includes(targetCurrency)) {
            rates[targetCurrency] = value;
          }
        }
      }
      return rates;
    },
  },
  components: {
    Loader,
    CardComponent,
  },
};
</script>