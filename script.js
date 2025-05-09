document.addEventListener('DOMContentLoaded', () =>{
  const expenseForm = document.getElementById('expense-form');
  const expenseName = document.getElementById('expense-name');
  const expenseAmount = document.getElementById('expense-amount'); 
  const expenseList = document.getElementById('expense-list'); 
  const totalAmountDisplay = document.getElementById('total-amount'); 

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || calculateTotal();



  renderExpenses();

  expenseForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if (name != "" && !isNaN(amount) && amount>0){
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();

      //Clear input field
      expenseName.value = ""
      expenseAmount.value = ""
    }
  });

  function renderExpenses(){
    expenseList.innerHTML = "";
    expenses.forEach((expense) =>{
      const li = document.createElement('li')
      li.innerHTML =`
      ${expense.name}- $${expense.amount}
      <button data-id= "${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  function calculateTotal(){
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  function saveExpensesTolocal() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  localStorage.setItem('totalAmount', totalAmount.toString());
}

  function updateTotal() {
  totalAmount = calculateTotal();
  totalAmountDisplay.textContent = totalAmount;
  localStorage.setItem('totalAmount', totalAmount.toString());
}


  expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute('data-id'));
      expenses = expenses.filter(expense => expense.id !== expenseId);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();
    }
  });

})
