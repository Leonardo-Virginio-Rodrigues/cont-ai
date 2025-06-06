import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Between, Repository } from 'typeorm';
import { parseDateDDMMYYYY } from 'src/common/validators/is-date-ddmmyyyy.validator';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      createdAt: parseDateDDMMYYYY(createTransactionDto.createdAt),
    });

    return this.transactionRepository.save(transaction);
  }
  async findAll(dateParam: string) {
    if (!dateParam) {
      return await this.transactionRepository.find({ order: { createdAt: 'ASC' } });
    }

    const [monthStr, yearStr] = dateParam.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(year)) {
      throw new BadRequestException('Invalid format. Use MM/YYYY');
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    return await this.transactionRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      order: { createdAt: 'ASC' },
    });
  }
}
