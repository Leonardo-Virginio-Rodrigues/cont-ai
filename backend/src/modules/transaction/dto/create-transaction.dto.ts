import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IsDateDDMMYYYY } from 'src/common/validators/is-date-ddmmyyyy.validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsIn(['credit', 'debit'])
  @IsNotEmpty()
  type: 'credit' | 'debit';

  @IsDateDDMMYYYY({ message: 'createdAt must be a valid date in dd/mm/yyyy format' })
  @IsNotEmpty()
  createdAt: string;
}
