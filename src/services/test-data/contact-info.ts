import {ContactInfo} from '../../store/contact-info/contact-info.state';

export interface ContactInfoData {
  [name: number]: ContactInfo;
}

export const INITIAL_CONTACT_INFO: ContactInfo[] = [
  {
    municipalCode: '0001',
    municipalName: 'Hobbiton',
    streetAddress: 'Beg End, Hobbiton, The Shire',
    postalCode: 'H0B 8I7',
    phoneNumber: '(555) 123-4567',
    emailAddress: 'admin@hobbiton.gov',
    faxNumber: '(555) 234-5678',
    contactName: 'Bilbo Baggins',
    officialTitle: 'Chief Administration Officer',
    auditorName: 'Elrond',
    auditFirmName: 'Rivendell Audits',
    auditorPhoneNumber: '(444) 345-6789',
    auditorEmailAddress: 'audit@rivendell.com',
    auditorFaxNumber: '(444) 456-7890'
  },
  {
    municipalCode: '0002',
    municipalName: 'Bree',
    streetAddress: '1 Brandywine Road, Bree, Bree-land',
    postalCode: 'B1R 3E3',
    phoneNumber: '(666) 321-7654',
    emailAddress: 'b.butterbur@prancingpony.com',
    faxNumber: '(666) 432-8765',
    contactName: 'Barliman Butterbur',
    officialTitle: 'Chief Administration Officer',
    auditorName: 'Elrond',
    auditFirmName: 'Rivendell Audits',
    auditorPhoneNumber: '(444) 345-6789',
    auditorEmailAddress: 'audit@rivendell.com',
    auditorFaxNumber: '(444) 456-7890'
  },
  {
    municipalCode: '0003',
    municipalName: 'Brandy Hall',
    streetAddress: 'PO Box 1, Brandy Hall, Buckland, The Shire',
    postalCode: 'B1R 4N0',
    phoneNumber: '(777) 566-7788',
    emailAddress: 'p.brandybuck@buckland.gov',
    faxNumber: '(777) 344-8899',
    contactName: 'Pippen Brandybuck',
    officialTitle: 'Chief Administration Officer',
    auditorName: 'Elrond',
    auditFirmName: 'Rivendell Audits',
    auditorPhoneNumber: '(444) 345-6789',
    auditorEmailAddress: 'audit@rivendell.com',
    auditorFaxNumber: '(444) 456-7890'
  },
];
