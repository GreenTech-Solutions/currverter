import type { KyInstance } from 'ky';
import ky from 'ky';

export const api: KyInstance = ky.create({});
