import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Pages/Auth/Authentication";
import ExpenseTracker from "./Pages/expense-tracker/ExpenseTracker";
// import ExpenseTracker from "./Pages/expense-tracker/Expense";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Authentication />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
