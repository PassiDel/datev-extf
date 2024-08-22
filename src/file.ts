import { DatevFileHeader } from './formats';
import { DatevFile, DatevRecord, datevToCsv } from './datev';
import { writeFile } from 'node:fs/promises';
import { PathLike } from 'fs';
import { Iconv } from 'iconv';

const iconv = new Iconv('UTF-8', 'ISO-8859-1');

export async function datevToFile<T extends DatevFile>(
  fileType: T,
  header: DatevRecord<typeof DatevFileHeader>,
  value: DatevRecord<T> | DatevRecord<T>[],
  file: PathLike
) {
  const csvContent = datevToCsv(fileType, header, value);
  await writeFile(file, iconv.convert(csvContent), 'binary');
}
