<template>
  <div>
    <Header @update-base-currency="updateBaseCurrency" />
    <router-view :baseCurrency="baseCurrency"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  data() {
    return {
      baseCurrency: 'RUB',
    };
  },
  methods: {
    updateBaseCurrency(newCurrency) {
      this.baseCurrency = newCurrency;
    },
  },
  components: {
    Header,
  },
};
</script>