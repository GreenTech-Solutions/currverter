import { api } from '@api';
import type { ICurrencyRates } from '@types';

export async function getRates(): Promise<ICurrencyRates> {
  return await api.get('https://status.neuralgeneration.com/api/currency').json();
}
