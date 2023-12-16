import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useAddTransaction } from "../../Hooks/useAddTransaction";
import { useGetTransactions } from "../../Hooks/useGetTransactions";
import { useGetUserInfo } from "../../Hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebase-config";
import { useCalculateTransactionBalance } from "../../Hooks/useCalculateTransactionBalance";

export default function ExpenseTracker() {
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { name, email, Profilephoto } = useGetUserInfo();
  const { totalBalance, totalExpense, totalIncome } =
    useCalculateTransactionBalance();

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const transactionAmount = e.target.amount.value;
    const transactionType = e.target.money.value;
    if (description.trim() !== "" && transactionAmount.trim() !== "") {
      if (transactionAmount >= 0) {
        addTransaction({
          description,
          transactionAmount,
          transactionType,
        });
        e.target.description.value = '';
        e.target.amount.value = '';
        e.target.money.unchecked()
      } else {
        alert("Amount must be positive bro.🤑");
      }
    } else {
      alert("Don't try to be over smart bro! I'm smarter than you.😎 ");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>${totalBalance}</h2>
          </div>
          <div className="summery">
            <div className="income">
              <h4>Income</h4>
              <p>${totalIncome}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${totalExpense}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="add-transaction">
            <input
              name="description"
              type="text"
              placeholder="Description"
              required
            />
            <input name="amount" type="number" placeholder="Amount" required />

            <input name="money" type="radio" id="expense" value="expense" />
            <label htmlFor="expense">Expense</label>
            <input name="money" type="radio" id="income" value="income" />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
        <div className="profile">
          {Profilephoto && (
            <img className="profilePhoto" src={Profilephoto} alt="photo" />
          )}
          <span>{email}</span>
          <button onClick={handleSignOut}>sign out</button>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transactions) => {
            const { description, transactionAmount, transactionType } =
              transactions;
            return (
              <li>
                <h4>{description}</h4>
                <p>
                  $ {transactionAmount} .{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
