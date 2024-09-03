import { Currency } from '@enums';

export interface ICurrencyRate {
  cBase: Currency;
  cTarget: Currency;
  rate: number;
}
