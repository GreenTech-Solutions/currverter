import { Currency } from '@enums';

type ICurrencyPair = `${Currency}_${Currency}`;

export type ICurrencyRates = {
  [key in ICurrencyPair]: number;
};
