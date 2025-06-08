export interface TransactionData {
  description: string;
  amount: number;
  type: "credit" | "debit";
  createdAt: string;
}
