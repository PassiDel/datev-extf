import { dateToYYYYMMDDHHMMSSFFFString, dateToYYYYMMDDString } from '@/utils';
import { DatevFile, DatevRecord } from '@/datev';

export const DatevFileHeader = {
  /**
   * EXTF = Export aus 3rd-Party App
   * DTVF = Export aus DATEV App
   */
  Kennzeichen: { defaultValue: 'EXTF', type: '' as 'EXTF' | 'DTVF' },
  /**
   * Versionsnummer des Headers.
   * Anhand der Versionsnummer können ältere Versionen abwärtskompatibel verarbeitet werden.
   */
  Versionsnummer: 700 as number,
  /**
   * 16 = Debitoren-/Kreditoren
   * 20 = Sachkontenbeschriftungen
   * 21 = Buchungsstapel
   * 46 = Zahlungsbedingungen
   * 48 = Diverse Adressen
   * 65 = Wiederkehrende Buchungen
   * */
  Formatkategorie: 16 as 16 | 20 | 21 | 46 | 48 | 65,
  Formatname: 'Buchungsstapel' as
    | 'Buchungsstapel'
    | 'Wiederkehrende Buchungen'
    | 'Debitoren/Kreditoren'
    | 'Sachkontenbeschriftungen'
    | 'Zahlungsbedingungen'
    | 'Diverse Adressen',
  /**
   * 5 = Debitoren-/Kreditoren
   * 3 = Sachkontenbeschriftungen
   * 13 = Buchungsstapel
   * 2 = Zahlungsbedingungen
   * 4 = Wiederkehrende Buchungen
   * 2 = Diverse Adressen
   */
  Formatversion: 0 as number,
  'Erzeugt am': {
    transformValue: (v?: string | number | Date) =>
      typeof v === 'string'
        ? v
        : dateToYYYYMMDDHHMMSSFFFString(new Date(v || new Date()))
  },
  Importiert: 0 as number,
  /**
   * Beispiel: RE
   */
  Herkunft: '' as string,
  /**
   * 	Beispiel: Max Mustermann
   */
  'Exportiert von': '' as string,
  /**
   * Beispiel: Admin
   */
  'Importiert von': '' as string,
  /**
   * Bereich 1001-9999999
   */
  Beraternummer: 1001 as number,
  /**
   * Bereich 1-99999
   */
  Mandantennummer: 1 as number,
  /**
   * Wirtschaftsjahresbeginn
   */
  'WJ-Beginn': {
    transformValue: (v?: string | number | Date) =>
      typeof v === 'string'
        ? v
        : dateToYYYYMMDDString(new Date(v || new Date()))
  },
  /**
   * Nummernlänge der Sachkonten.
   * Wert muss beim Import mit Konfiguration des Mandats in der DATEV App übereinstimmen.
   */
  Sachkontenlaenge: { type: 0 as number, customName: 'Sachkontenlänge' },
  /**
   * Beginn der Periode des Stapels
   */
  'Datum von': {
    transformValue: (v?: string | number | Date) =>
      typeof v === 'string'
        ? v
        : dateToYYYYMMDDString(new Date(v || new Date()))
  },
  /**
   * Ende der Periode des Stapels
   */
  'Datum bis': {
    transformValue: (v?: string | number | Date) =>
      typeof v === 'string'
        ? v
        : dateToYYYYMMDDString(new Date(v || new Date()))
  },
  /**
   * Bezeichnung des Stapels
   *
   * Beispiel: Rechnungsausgang 02/2024
   */
  Bezeichnung: '' as string,
  /**
   * Kürzel in Großbuchstaben des Bearbeiters
   *
   * Beispiel: "MM" für Max Mustermann
   */
  Diktatkuerzel: {
    type: '' as string,
    customName: 'Diktatkürzel'
  },
  /**
   * 1 = Finanzbuchführung (default)
   * 2 = Jahresabschluss
   */
  Buchungstyp: { defaultValue: 1, type: 1 as 1 | 2 },
  /**
   * 0 = unabhängig (default)
   * 30 = Steuerrecht
   * 40 = Kalkulatorik
   * 50 = Handelsrecht
   * 64 = IFRS
   */
  Rechnungslegungszweck: { defaultValue: 9, type: 0 as 0 | 30 | 40 | 50 | 64 },
  Festschreibung: {
    transformValue: (v?: boolean) => (v === undefined || v ? 1 : 0)
  },
  /**
   * ISO-Code der Währung
   */
  WKZ: { defaultValue: 'EUR', type: '' as string },
  Reserviert23: { type: 0 as number, customName: 'Reserviert' },
  Derivatskennzeichen: '' as string,
  Reserviert25: { type: 0 as number, customName: 'Reserviert' },
  Reserviert26: { type: 0 as number, customName: 'Reserviert' },
  /**
   * Sachkontenrahmen der für die Bewegungsdaten verwendet wurde
   */
  Sachkontenrahmen: '' as string,
  /**
   * Falls eine spezielle DATEV Branchenlösung genutzt wird.
   */
  IDBranchenloesung: { type: 0 as number, customName: 'ID der Branchenlösung' },
  Reserviert29: { type: 0 as number, customName: 'Reserviert' },
  Reserviert30: { type: '' as string, customName: 'Reserviert' },
  /**
   * Verarbeitungskennzeichen der abgebenden Anwendung
   * z.B. 02/2024
   */
  Anwendungsinformation: '' as string
} as const satisfies DatevFile;

export type DatevFileRecords = DatevRecord<typeof DatevFileHeader>;
