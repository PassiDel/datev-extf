import { assert, test } from 'vitest';
import { DatevSachkontenbeschriftungenHeader } from '../src';
import { datevToCsv } from '@/datev';

test('CSV generation', () => {
  const csvContent = datevToCsv(DatevSachkontenbeschriftungenHeader, {}, []);
  // 1 Global Header + 1 File Header
  assert.lengthOf(csvContent.split('\r\n'), 2);
});
