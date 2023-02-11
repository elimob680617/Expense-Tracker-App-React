import { useEffect, useState } from "react";
import ExpenseOverView from "./ExpenseOverView";
import Transactions from "./Transactions";

const ExpenseApp = () => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [transActions, setTransActions] = useState([]);

  const addTransaction = (formValues) => {
    setTransActions([...transActions, { ...formValues, id: Date.now() }]);
  };

  useEffect(() => {
    let exp = 0;
    let inc = 0;
    transActions.forEach((t) =>
      t.type === "expense" ? (exp = exp + +t.amount) : (inc = inc + +t.amount)
    );
    setExpense(exp);
    setIncome(inc);
  }, [transActions]);

  const onDelete = (id) => {
    console.log(id);
    const filtered = transActions.filter((t) => t.id !== id);
    setTransActions(filtered);
  };

  return (
    <section className="container">
      <ExpenseOverView
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      <Transactions transActions={transActions} onDelete={onDelete} />
    </section>
  );
};

export default ExpenseApp;
