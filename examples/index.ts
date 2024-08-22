import {
  DatevFileHeader,
  type DatevFileRecords,
  DatevSachkontenbeschriftungenHeader,
  type DatevSachkontenbeschriftungenRecords
} from '../src/formats';
import { datevToCsv, printDatev } from '../src';
import { datevToFile } from '../src/file';

// Define your global file headers, they can be reused for different exports
const globalFileHeaders: DatevFileRecords = {
  Beraternummer: 33333,
  Mandantennummer: 999
};

// Add specific headers for an export
const sachkontenFileHeaders: DatevFileRecords = {
  ...globalFileHeaders,
  Formatname: 'Sachkontenbeschriftungen',
  Formatkategorie: 20
};

// console.table the file headers
printDatev(DatevFileHeader, sachkontenFileHeaders);

// Create some data
const rows: DatevSachkontenbeschriftungenRecords[] = [
  {
    Kontenbeschriftung: 'aaaaa',
    'Sprach-ID': 'a'
  },
  {
    Konto: 33,
    Kontenbeschriftung: 'Anotäääööößher account'
  }
];

// "Render" contents to string
const csvContent = datevToCsv(
  // Types (for column headers)
  DatevSachkontenbeschriftungenHeader,
  // Combined file headers, global + custom
  sachkontenFileHeaders,
  // your data rows
  rows
);

console.log(csvContent);

// Same thing, but write it to a file!
const file = './index.csv';
await datevToFile(
  // Types (for column headers)
  DatevSachkontenbeschriftungenHeader,
  // Combined file headers, global + custom
  sachkontenFileHeaders,
  // your data rows
  rows,
  file
)
  .then(() => console.log('done!'))
  .catch((e) => console.error('err', e));
