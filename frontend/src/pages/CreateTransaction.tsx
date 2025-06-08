import { useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Form.module.css";
import { createTransaction } from "@/services/transactions";
import { ApiValidationError } from "@/types/api";
import { TransactionData } from "@/types/transaction";

export default function CreateTransaction() {
  const [formData, setFormData] = useState<TransactionData>({
    description: "",
    amount: 0,
    type: "credit",
    createdAt: "",
  });

  // Estado para erros por campo
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await createTransaction(formData);
      alert("Transação criada com sucesso!");
      setFormData({
        description: "",
        amount: 0,
        type: "credit",
        createdAt: "",
      });
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        Array.isArray((error as ApiValidationError).message)
      ) {
        const apiError = error as ApiValidationError;

        const fieldErrors: { [key: string]: string } = {};

        apiError.message.forEach((msg) => {
          if (msg.toLowerCase().includes("description"))
            fieldErrors.description = msg;
          else if (msg.toLowerCase().includes("amount"))
            fieldErrors.amount = msg;
          else if (msg.toLowerCase().includes("type")) fieldErrors.type = msg;
          else if (msg.toLowerCase().includes("createdat"))
            fieldErrors.createdAt = msg;
        });

        setErrors(fieldErrors);
      } else {
        alert("Unexpected error, please try again.");
      }
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Create Transaction</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </label>

          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
          </label>

          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
          </label>

          <label>
            Created At:
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              required
            />
            {errors.createdAt && (
              <p style={{ color: "red" }}>{errors.createdAt}</p>
            )}
          </label>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
