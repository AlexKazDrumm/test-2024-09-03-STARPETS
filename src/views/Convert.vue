<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <PageTitle title="Currency conversion" />

    <CardComponent>
      <div class="flex space-x-2 items-center mb-4">
        <InputField
          v-model="amountFrom"
          :error="inputErrorFrom"
          errorText="Please enter a valid value"
          @input="convertCurrency('from')"
        >
          <CurrencyDropdown
            :currency="currencyFrom"
            :options="currencies"
            @update:currency="updateCurrencyFrom"
          />
        </InputField>
      </div>

      <div class="flex space-x-2 items-center">
        <InputField
          v-model="amountTo"
          :error="inputErrorTo"
          errorText="Please enter a valid value"
          @input="convertCurrency('to')"
        >
          <CurrencyDropdown
            :currency="currencyTo"
            :options="currencies"
            @update:currency="updateCurrencyTo"
          />
        </InputField>
      </div>
    </CardComponent>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue';
import CardComponent from '../components/CardComponent.vue';
import CurrencyDropdown from '../components/CurrencyDropdown.vue';
import InputField from '../components/InputField.vue';
import { fetchCurrencyRates } from '../services/currencyService';
import { validateInput, calculateAmount, getRate } from '../utils/currencyUtils';

export default {
  components: {
    PageTitle,
    CardComponent,
    CurrencyDropdown,
    InputField,
  },
  props: {
    baseCurrency: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currencyFrom: this.baseCurrency,
      currencyTo: 'USD',
      amountFrom: '',
      amountTo: '',
      rates: {},
      inputErrorFrom: false,
      inputErrorTo: false,
      activeInput: 'from',
      currencies: ['EUR', 'RUB', 'USD'],
    };
  },
  async created() {
    this.rates = await fetchCurrencyRates();
    this.convertCurrency('from');
  },
  methods: {
    updateCurrencyFrom(newCurrency) {
      this.currencyFrom = newCurrency;
      this.convertCurrency('from');
    },
    updateCurrencyTo(newCurrency) {
      this.currencyTo = newCurrency;
      this.convertCurrency('to');
    },
    convertCurrency(direction) {
      let inputAmount;
      if (direction === 'from') {
        inputAmount = this.amountFrom;
        this.activeInput = 'from';
      } else {
        inputAmount = this.amountTo;
        this.activeInput = 'to';
      }

      if (!validateInput(inputAmount)) {
        if (direction === 'from') {
          this.inputErrorFrom = true;
        } else {
          this.inputErrorTo = true;
        }
        return;
      }

      this.inputErrorFrom = false;
      this.inputErrorTo = false;

      const rate = direction === 'from'
        ? getRate(this.rates, this.currencyFrom, this.currencyTo)
        : getRate(this.rates, this.currencyTo, this.currencyFrom);

      if (direction === 'from') {
        this.amountTo = calculateAmount(this.amountFrom, rate);
      } else {
        this.amountFrom = calculateAmount(this.amountTo, 1 / rate);
      }
    },
  },
  watch: {
    currencyFrom() {
      if (this.activeInput === 'from') {
        this.convertCurrency('from');
      }
    },
    currencyTo() {
      if (this.activeInput === 'to') {
        this.convertCurrency('to');
      }
    },
  },
};
</script>