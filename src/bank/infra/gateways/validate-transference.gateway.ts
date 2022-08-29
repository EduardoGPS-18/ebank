import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  ValidateTransferenceGateway,
  ValidateTransferenceParams,
} from 'src/bank/domain/services/bank.service.dependencies';

// TODO: TEST
export class ValidateTransferenceMock implements ValidateTransferenceGateway {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async validate(_params: ValidateTransferenceParams): Promise<void> {
    const url = this.configService.get('VALIDATE_TRANSACTION_GATEWAY_URL');

    const result = await firstValueFrom(this.httpService.get(url));
    console.log(result.data);

    if (!result) {
      throw new Error();
    }
  }
}
