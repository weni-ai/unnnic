export type DisclaimerTypeV2 =
  | 'informational'
  | 'success'
  | 'attention'
  | 'error'
  | 'neutral';

export interface DisclaimerV2Props {
  title?: string;
  showTitle?: boolean;
  description?: string;
  showDescription?: boolean;
  type?: DisclaimerTypeV2;
}
