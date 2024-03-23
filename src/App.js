import './App.css';
import WalletCard from './Components/WalletCard';
function App() {
  return (
    <div className="App">
      <div className='heading'>Expense Tracker</div>
      <div className='tracker-head-section'>
        <div className='wallet-section'>
          <WalletCard text = "Wallet Balance" btn_text = "Add Income" transactionType = "addingAmount"/>
          <WalletCard text = "Expenses" btn_text = "Add Expense" transactionType = "subtractingAmount"/>
        </div>
      </div>
    </div>
  );
}

export default App;
