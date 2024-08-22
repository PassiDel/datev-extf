# DATEV EXTF Files

> Generate DATEV-compliant EXTF files from js!

Based on [DATEV Format](https://developer.datev.de/de/file-format/details/5)

## Install

```shell
npm install --save datev-extf
```

## Example

```ts
import {
  type DatevSachkontenbeschriftungenRecords,
  type DatevFileRecords,
  // Types for first line (file header)
  DatevFileHeader,
  // Types for "Sachkontenbeschriftungen"
  DatevSachkontenbeschriftungenHeader
} from 'datev-extf/formats';

import { datevToCsv, printDatev } from 'datev-extf';

// If you only need to generate the CSV contents, you can omit this line
import { datevToFile } from 'datev-extf/file';

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
    Kontenbeschriftung: 'Another account'
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
```
