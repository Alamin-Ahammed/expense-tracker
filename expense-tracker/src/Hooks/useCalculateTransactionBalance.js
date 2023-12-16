import { useGetTransactions } from "./useGetTransactions";

export const useCalculateTransactionBalance = () => {
  const { transactions } = useGetTransactions();
  let totalIncome = 0;
  let totalExpense = 0;
  let totalBalance = 0;
  transactions.forEach((transaction) => {
    if (transaction.transactionType === "income") {
      totalIncome += Number(transaction.transactionAmount);
    } else {
      totalExpense += Number(transaction.transactionAmount);
    }
  });

  totalBalance = totalIncome - totalExpense;

  return { totalBalance, totalIncome, totalExpense };
};
