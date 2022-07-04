
export interface ContactInfo {
  municipalCode: string;
  municipalName: string;
  streetAddress: string;
  postalCode: string;
  phoneNumber: string;
  emailAddress: string;
  faxNumber: string;
  contactName: string;
  officialTitle: string;
  auditorName: string;
  auditFirmName: string;
  auditorPhoneNumber: string;
  auditorEmailAddress: string;
  auditorFaxNumber: string;
}

export interface ContactInfoState {
  municipalContactInfo: ContactInfo[];
}

export const DEFAULT_CONTACT_INFO_STATE: ContactInfoState = {
  municipalContactInfo: [],
};
