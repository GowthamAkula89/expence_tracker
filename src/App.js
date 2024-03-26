import React, { useEffect, useState } from 'react';
import './App.css';
import WalletCard from './Components/WalletCard';
import ExpensesList from './Components/ExpensesList';
function App() {
  const [expensesList, setExpensesList] = useState([
    { title: 'Treaking', price: 45, category: 'Entertainment', date: '25/08/2023' },
    { title: '12th fail', price: 154, category: 'Entertainment', date: '25/02/2024' },
    { title: 'Biryani', price: 254, category: 'Food', date: '26/02/2024' }
  ]);
  const[totalExpenses, setTotalExpenses] = useState(0);
  
  useEffect(()=>{
    const totalExpensesValue = expensesList.reduce((total, expense) => total + expense.price, 0);
    setTotalExpenses(totalExpensesValue);
  },[expensesList])
  console.log(expensesList)
  return (
    <div className="App">
      <div className='heading'>Expense Tracker</div>
      <div className='tracker-head-section'>
        <div className='wallet-section'>
          <WalletCard 
              text = "Wallet Balance" 
              btn_text = "Add Income" 
              transactionType = "addingAmount" 
              value = {5000}/>
          <WalletCard 
              text = "Expenses" 
              btn_text = "Add Expense" 
              transactionType = "expenseAmount" 
              value = {parseInt(totalExpenses)} 
              setExpensesList={setExpensesList}/>
        </div>
      </div>
      <ExpensesList expensesList={expensesList} setExpensesList={setExpensesList}/>
      
    </div>
  );
}
export default App;