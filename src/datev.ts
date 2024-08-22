import { DatevFileHeader } from './formats';

type HeaderConfig = {
  defaultValue?: DatevPrimitive;
  customName?: string;
};

type HeaderType<T extends DatevPrimitive> = {
  type: T;
};
type HeaderTransform<T> = {
  transformValue: (value?: T) => DatevPrimitive;
};

export type HeaderWithConfig<T> = HeaderConfig &
  (T extends DatevPrimitive ? HeaderType<T> : HeaderTransform<T>);

export type DatevPrimitive = string | number | null | undefined;

export type DatevFile = Record<string, HeaderWithConfig<any> | DatevPrimitive>;

export type FullDatevRecord<Type extends DatevFile> = {
  [key in keyof Type]: Type[key] extends HeaderWithConfig<infer T>
    ? T
    : Type[key];
};
export type DatevRecord<Type extends DatevFile> = Partial<
  FullDatevRecord<Type>
>;

export function isHeaderWithConfig(
  header: DatevFile[string]
): header is HeaderWithConfig<any> {
  return (
    header !== null &&
    header !== undefined &&
    typeof header === 'object' &&
    ((header as HeaderType<any>).type !== undefined ||
      (header as HeaderTransform<any>).transformValue !== undefined)
  );
}

export function escapeDatevPrimitive(primitive: DatevPrimitive | any): string {
  if (primitive === null || primitive === undefined) return '';

  if (typeof primitive === 'string') return `"${primitive}"`;

  if (typeof primitive === 'number') return primitive.toString();

  return primitive as string;
}

function getTransformer(
  header: DatevFile[string]
): Required<HeaderTransform<any>>['transformValue'] {
  const transformer = (header as HeaderTransform<any>).transformValue;
  if (isHeaderWithConfig(header) && transformer !== undefined) {
    return transformer;
  }

  return (v) => v;
}

function extendRecordWithDefaults<T extends DatevFile>(
  header: T,
  record: DatevRecord<T>
): FullDatevRecord<T> {
  return Object.fromEntries(
    Object.keys(header).map((h: keyof T) => {
      const datevFileHeaderElement = header[h];

      const isConfigHeader = isHeaderWithConfig(datevFileHeaderElement);

      const value =
        record[h] ??
        (isConfigHeader
          ? datevFileHeaderElement.defaultValue
          : datevFileHeaderElement);

      const transform = getTransformer(datevFileHeaderElement);

      return [
        isConfigHeader && datevFileHeaderElement.customName
          ? datevFileHeaderElement.customName
          : h,
        escapeDatevPrimitive(transform(value))
      ];
    })
  ) as FullDatevRecord<T>;
}

export function printDatev<T extends DatevFile>(
  header: T,
  value: DatevRecord<T> | DatevRecord<T>[]
) {
  const values = Array.isArray(value) ? value : [value];
  const fullRecords = values.map((v) => extendRecordWithDefaults(header, v));

  console.table(fullRecords);
}

export function datevToCsv<T extends DatevFile>(
  fileType: T,
  header: DatevRecord<typeof DatevFileHeader>,
  value: DatevRecord<T> | DatevRecord<T>[]
) {
  const fileHeader = Object.values(
    extendRecordWithDefaults(DatevFileHeader, header)
  );

  const values = Array.isArray(value) ? value : [value];
  const fullRecords = values
    .map((v) => extendRecordWithDefaults(fileType, v))
    .map((r) => Object.values(r) as string[]);

  const headerRow = Object.keys(fileType).map((h: keyof T) => {
    const datevFileHeaderElement = fileType[h];

    return isHeaderWithConfig(datevFileHeaderElement) &&
      datevFileHeaderElement.customName
      ? datevFileHeaderElement.customName
      : (h as string);
  });

  return [fileHeader, headerRow, ...fullRecords]
    .map((c) => c.join(';'))
    .join('\r\n');
}
