import { UserId } from './bank.service.dto';

export type ValidateTransferenceParams = {
  from: UserId;
  to: UserId;
  amount: number;
};
export interface ValidateTransferenceGateway {
  validate(params: ValidateTransferenceParams): Promise<void>;
}
