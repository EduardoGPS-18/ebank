import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class TransferAmountDTO {
  @ApiProperty({ example: randomUUID(), description: 'Receiver user ID' })
  to: string;

  @ApiProperty({ example: 100, description: 'Amount to transfer in R$' })
  amount: number;
}
