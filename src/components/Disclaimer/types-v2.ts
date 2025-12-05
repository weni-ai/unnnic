export type DisclaimerTypeV2 =
  | 'informational'
  | 'success'
  | 'attention'
  | 'error'
  | 'neutral';

export interface DisclaimerV2Props {
  title?: string;
  description?: string;
  type?: DisclaimerTypeV2;
}
