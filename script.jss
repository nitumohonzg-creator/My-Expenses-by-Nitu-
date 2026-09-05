// Data Arrays
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const form = document.getElementById('transaction-form');
const totalExpenseEl = document.getElementById('total-expense');
const udharGivenEl = document.getElementById('udhar-given');
const udharTakenEl = document.getElementById('udhar-taken');
const historyList = document.getElementById('history-list');

// Add Transaction
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;
    const details = document.getElementById('details').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        date,
        type,
        details,
        amount
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();
    form.reset();
});

// Update Dashboard Numbers
function updateDashboard() {
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const lent = transactions.filter(t => t.type === 'lent').reduce((acc, t) => acc + t.amount, 0);
    const borrowed = transactions.filter(t => t.type === 'borrowed').reduce((acc, t) => acc + t.amount, 0);

    totalExpenseEl.innerText = `₹${expenses}`;
    udharGivenEl.innerText = `₹${lent}`;
    udharTakenEl.innerText = `₹${borrowed}`;
}

// Show History List
function addTransactionDOM(transaction) {
    const li = document.createElement('li');
    li.classList.add(`type-${transaction.type}`);

    // Formatting date
    const dateObj = new Date(transaction.date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    li.innerHTML = `
        <div class="history-details">
            <strong>${transaction.details}</strong>
            <span class="history-date">${formattedDate} • ${transaction.type.toUpperCase()}</span>
        </div>
        <div class="history-amount">₹${transaction.amount}</div>
    `;

    historyList.appendChild(li);
}

// Initialize App
function init() {
    historyList.innerHTML = '';
    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    transactions.forEach(addTransactionDOM);
    updateDashboard();
}

// Save to LocalStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Run app
init();
