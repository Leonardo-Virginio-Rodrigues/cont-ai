import { TransactionData } from "@/types/transaction";
import { ApiValidationError } from "@/types/api";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transaction`;

export async function createTransaction(data: TransactionData) {
  try {
    const formattedData = {
      ...data,
      createdAt: dayjs(data.createdAt).format("DD/MM/YYYY"),
    };
    const response = await axios.post(API_URL, formattedData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data as ApiValidationError;
    }
    throw error;
  }
}
