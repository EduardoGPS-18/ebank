import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserID } from 'src/@shared/presentation/get-user.decorator';
import { JwtGuard } from 'src/@shared/presentation/jwt.guard';
import { BankUseCases } from '../application/bank.usecases';
import { TransferAmountDTO } from './bank.dto';

@Controller('bank')
@ApiTags('Bank operations')
export class BankController {
  constructor(private bankUseCases: BankUseCases) {}

  @Post('/transfer')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: () => ({ error: 'Amount too low' }) })
  @ApiResponse({
    status: 404,
    type: () => ({ error: 'Sender user not found' }),
  })
  @ApiResponse({
    status: 404,
    type: () => ({ error: 'Receiver user not found' }),
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async transfer(
    @Body() body: TransferAmountDTO,
    @GetUserID() userId: string,
  ): Promise<void> {
    await this.bankUseCases.transfer({ ...body, from: userId });
  }
}
