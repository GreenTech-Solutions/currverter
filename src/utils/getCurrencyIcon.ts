import { Currency } from '@enums';
import { BRLIcon, EURIcon, IDRIcon, KZTIcon, USDIcon, RUBIcon } from '@icons';

export function getCurrencyIcon(currency: Currency): string {
  switch (currency) {
    case Currency.USD:
      return USDIcon;
    case Currency.EUR:
      return EURIcon;
    case Currency.BRL:
      return BRLIcon;
    case Currency.KZT:
      return KZTIcon;
    case Currency.IDR:
      return IDRIcon;
    case Currency.RUB:
      return RUBIcon;
    default:
      throw new Error(`Unsupported currency: ${currency}`);
  }
}

export function getCurrenciesIcons(): string {
  return Object.values(Currency)
    .map((currency) => getCurrencyIcon(currency))
    .join('');
}
