export interface TransactionData {
  description: string;
  amount: number;
  type: "credit" | "debit";
  createdAt: string;
}

export interface TransactionResponse extends TransactionData {
  id: number;
}

export type TransactionFormData = {
  description: string;
  amount: string;
  type: "credit" | "debit";
  createdAt: string;
};
