export const filterTransactions = (transactions: any[]): any[] => {
  return transactions
    .filter((transaction) => transaction.category_title !== "Income")
    .sort((a, b) => {
      return b.amount.value - a.amount.value;
    })
    .slice(0, 10);
};
