import {
  DatevFileHeader,
  DatevFileRecords,
  DatevSachkontenbeschriftungenHeader,
  DatevSachkontenbeschriftungenRecords
} from '@/formats';
import { datevToCsv, printDatev } from '@/datev';

const fileHeaders: DatevFileRecords = {
  Beraternummer: 33333,
  Formatname: 'Debitoren/Kreditoren',
  Formatkategorie: 21
};

console.log(fileHeaders);

printDatev(DatevFileHeader, fileHeaders);

const rows: DatevSachkontenbeschriftungenRecords[] = [
  {
    Kontenbeschriftung: 'aaaaa',
    'Sprach-ID': 'a'
  },
  {
    Konto: 33
  }
];
printDatev(DatevSachkontenbeschriftungenHeader, rows);

console.log(datevToCsv(DatevSachkontenbeschriftungenHeader, fileHeaders, rows));
