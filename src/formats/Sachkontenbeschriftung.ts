import { DatevFile, DatevRecord } from '../datev';

export const DatevSachkontenbeschriftungenHeader = {
  Kontenbeschriftung: '' as string,
  Konto: { type: 0 as number },
  'Sprach-ID': '' as string
} as const satisfies DatevFile;

export type DatevSachkontenbeschriftungenRecords = DatevRecord<
  typeof DatevSachkontenbeschriftungenHeader
>;
