export interface Template {
  header: {
    type: 'TEXT' | 'MEDIA';
    mediaType?: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string | null;
    src?: string | null;
  };
  body?: string;
  footer?: string;
  buttons?: Array<{
    type: 'QUICK_REPLY' | 'PHONE_NUMBER';
    text: string;
    countryCode?: string;
    phoneNumber?: string;
  }>;
}
