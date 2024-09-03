import { getRates } from '@api';
import { Currency } from '@enums';
import { ICurrencyRate, ICurrencyRates } from '@types';
import { defineStore } from 'pinia';

interface IServiceState {
  currentCurrency: Currency;
  rates: ICurrencyRate[];
}

export const useServiceStore = defineStore('service', {
  state: (): IServiceState => ({
    currentCurrency: Currency.USD,
    rates: [],
  }),
  actions: {
    async fetchCurrencyRates(): Promise<void> {
      const response = await getRates();

      this.rates = Object.entries(response).map(([key, rate]) => {
        const [cBase, cTarget] = key.split('-');
        return { cBase: cBase.toUpperCase(), cTarget: cTarget.toUpperCase(), rate } as ICurrencyRate;
      });
    },

    async getRates(): Promise<ICurrencyRate[]> {
      if (this.rates.length === 0) {
        await this.fetchCurrencyRates();
      }
      return this.rates;
    },
  },
});

export default useServiceStore;
