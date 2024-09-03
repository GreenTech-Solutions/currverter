import { Currency } from '@enums';
import type { ISelectItem } from '@components/ui';
import { getCurrencyIcon } from './getCurrencyIcon';

export function getCurrenciesSelectItems(): ISelectItem<Currency>[] {
  return Object.values(Currency).map((value) => ({
    value,
    label: value,
    icon: getCurrencyIcon(value),
  }));
}
