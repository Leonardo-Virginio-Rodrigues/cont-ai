import { useEffect, useState } from "react";
import Header from "../components/Header";
import { format } from "date-fns";
import { TransactionResponse } from "@/types/transaction";
import { getTransactions } from "@/services/transactions";
import styles from "@/styles/FindTransactions.module.css";

type GroupedTransactions = {
  [monthYear: string]: TransactionResponse[];
};

export default function FindTransactions() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [grouped, setGrouped] = useState<GroupedTransactions>({});

  useEffect(() => {
    const fetch = async () => {
      const data = await getTransactions();

      const parsed = data.map((t) => ({
        ...t,
        amount: Number(t.amount),
      }));

      setTransactions(parsed);
    };
    fetch();
  }, []);

  useEffect(() => {
    const groupedByMonthYear: GroupedTransactions = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.createdAt);
      const key = format(date, "MM/yyyy");
      if (!groupedByMonthYear[key]) groupedByMonthYear[key] = [];
      groupedByMonthYear[key].push(tx);
    });

    setGrouped(groupedByMonthYear);
  }, [transactions]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div>
      <Header />
      <main className={styles.container}>
        {Object.entries(grouped).map(([monthYear, txs]) => {
          const [month, year] = monthYear.split("/");

          const totalCredit = txs
            .filter((t) => t.type === "credit")
            .reduce((sum, t) => sum + Number(t.amount), 0);

          const totalDebit = txs
            .filter((t) => t.type === "debit")
            .reduce((sum, t) => sum + Number(t.amount), 0);

          return (
            <div key={monthYear} className={styles.monthSection}>
              <h2 className={styles.monthTitle}>
                {format(new Date(Number(year), Number(month) - 1), "MMMM yyyy")}
              </h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {txs.map((t) => (
                    <tr key={t.id}>
                      <td>{format(new Date(t.createdAt), "dd/MM/yyyy")}</td>
                      <td>{t.description}</td>
                      <td>{formatCurrency(Number(t.amount))}</td>
                      <td>{t.type}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td colSpan={2}>Totais do mês</td>
                    <td>{formatCurrency(totalCredit - totalDebit)}</td>
                    <td>
                      +{formatCurrency(totalCredit)} / -
                      {formatCurrency(totalDebit)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </main>
    </div>
  );
}
