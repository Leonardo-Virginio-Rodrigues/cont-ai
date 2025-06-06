import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column()
  type: 'credit' | 'debit';

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
