import React, { useState, useEffect } from "react";
import { filterTransactions } from "./utils";
import "./styles.css";

const App = (): JSX.Element => {
  const [hasError, setError] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchData = (): Promise<void> =>
    fetch("http://www.mocky.io/v2/5c62e7c33000004a00019b05")
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => setError(error));

  useEffect(() => {
    fetchData();
  }, []);

  const renderTableHeader: JSX.Element[] =
    transactions.length &&
    Object.keys(transactions[0]).map((key, index) => (
      <th key={index}>{key.toUpperCase().replace(/_/g, " ")}</th>
    ));

  const renderTableData = (): JSX.Element[] => {
    const filteredTransactions = filterTransactions(transactions);

    return filteredTransactions.map((transaction) => {
      const { id, description, date, category_title, amount } = transaction;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{date}</td>
          <td>{description}</td>
          <td>{category_title}</td>
          <td>
            {amount.value} {amount.currency_iso}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Transactions</h1>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>{renderTableHeader}</tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
