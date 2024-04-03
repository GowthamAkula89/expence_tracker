import React, { useEffect, useState } from 'react';
import './App.css';
import WalletCard from './Components/WalletCard';
import ExpensesList from './Components/ExpensesList';
import ExpensesPieChart from './Components/ExpensesPieChart';

function App() {
  const [walletBalance, setWalletBalance] = useState(localStorage.getItem('walletBalance')|| 5000);
  useEffect(() => {
    localStorage.setItem('walletBalance',walletBalance);
  },[walletBalance])
  const [expensesList, setExpensesList] = useState(
    JSON.parse(localStorage.getItem('expensesList')) || [
      { title: 'Treaking', price: 445, category: 'Travel', date: '25/08/2023' },
      { title: '12th fail', price: 154, category: 'Entertainment', date: '25/02/2024' },
      { title: 'Biryani', price: 254, category: 'Food', date: '26/02/2024' }
    ]
  );
  const[totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
      localStorage.setItem('expensesList', JSON.stringify(expensesList));
  }, [expensesList]);
  useEffect(()=>{
    const totalExpensesValue = expensesList.reduce((total, expense) => total + expense.price, 0);
    setTotalExpenses(totalExpensesValue);
  },[expensesList])

  const [categoriesData, setCategoriesData] = useState([]);
    const COLORS = ['#A000FF', '#FF9304', '#FDE006'];
    useEffect(() => {
        // Calculate total expenses for each category
        const totalExpenses = expensesList.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.price;
            return acc;
        }, {});

        // Convert total expenses into pie chart data format
        const pieChartData = Object.keys(totalExpenses).map((category, index) => ({
            name: category,
            value: totalExpenses[category],
            color: COLORS[index % COLORS.length] // Assign color from COLORS array based on index
        }));

        setCategoriesData(pieChartData);
    }, [expensesList]);
    categoriesData.sort((a, b) => b.value - a.value);
  return (
    <div className="App">
      <div className='heading'>Expense Tracker</div>
      <div className='tracker-head-section'>
        <div className='wallet-section'>
          <WalletCard 
              text = "Wallet Balance" 
              btn_text = "Add Income" 
              transactionType = "addingAmount" 
              value = {parseInt(walletBalance)}
              setWalletBalance = {setWalletBalance}
          />
          <WalletCard 
              text = "Expenses" 
              btn_text = "Add Expense" 
              transactionType = "expenseAmount" 
              value = {parseInt(totalExpenses)}
              setWalletBalance = {setWalletBalance} 
              setExpensesList={setExpensesList}/>
        </div>
        <ExpensesPieChart categoriesData={categoriesData}/>
      </div>
        <ExpensesList 
          expensesList={expensesList} 
          setExpensesList={setExpensesList} 
          categoriesData={categoriesData}
          setWalletBalance={setWalletBalance}
        />
    </div>
  );
}
export default App;