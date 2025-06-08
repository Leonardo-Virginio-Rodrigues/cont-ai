import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
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
  async findAll() {
    return await this.transactionRepository.find({
      order: { createdAt: 'ASC' },
    });
  }
}
