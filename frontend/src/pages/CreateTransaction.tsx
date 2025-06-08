import { useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Form.module.css";
import { createTransaction } from "@/services/transactions";
import { ApiValidationError } from "@/types/api";
import { TransactionData, TransactionFormData } from "@/types/transaction";

export default function CreateTransaction() {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: "",
    amount: "",
    type: "credit",
    createdAt: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const preparedData: TransactionData = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      await createTransaction(preparedData);
      alert("Lançamento cadastrado com sucesso!");
      setFormData({
        description: "",
        amount: "",
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
            fieldErrors.description =
              "A descrição é obrigatória e não pode ficar vazia.";
          else if (msg.toLowerCase().includes("amount"))
            fieldErrors.amount =
              "O valor deve ser um número positivo maior que zero.";
          else if (msg.toLowerCase().includes("type"))
            fieldErrors.type =
              "Tipo inválido. Os tipos permitidos são: Credit ou Debit.";
          else if (msg.toLowerCase().includes("createdat"))
            fieldErrors.createdAt = "Data inválida. Use o formato DD/MM/YYYY.";
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
        <h1 className={styles.title}>Cadastrar Lançamento</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              placeholder="Ex: Pagamento do salário!"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </label>

          <label>
            Valor:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Ex: 100.00"
            />
            {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
          </label>

          <label>
            Tipo:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </select>
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
          </label>

          <label>
            Data do lançamento:
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
            />
            {errors.createdAt && (
              <p style={{ color: "red" }}>{errors.createdAt}</p>
            )}
          </label>

          <button type="submit" className={styles.button}>
            Criar
          </button>
        </form>
      </main>
    </div>
  );
}
