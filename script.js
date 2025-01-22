document.addEventListener("DOMContentLoaded", () => {
    const expenseContainer = document.getElementById("expense-container");
    const transactionContainer = document.getElementById("transaction-container");
    const addExpenseButton = document.getElementById("add-expense");
    const addTransactionButton = document.getElementById("add-transaction");
    const saveDataButton = document.getElementById("save-data");

    function createEditableEntry(container, type) {
        const entry = document.createElement("div");
        entry.classList.add("editable");

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = new Date().toISOString().split("T")[0];
        entry.appendChild(dateInput);

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.placeholder = `Enter ${type} details`;
        entry.appendChild(textInput);

        container.appendChild(entry);
    }

    function saveToLocalStorage() {
        const expenses = Array.from(expenseContainer.children).map(entry => ({
            date: entry.querySelector("input[type='date']").value,
            text: entry.querySelector("input[type='text']").value
        }));

        const transactions = Array.from(transactionContainer.children).map(entry => ({
            date: entry.querySelector("input[type='date']").value,
            text: entry.querySelector("input[type='text']").value
        }));

        localStorage.setItem("expenses", JSON.stringify(expenses));
        localStorage.setItem("transactions", JSON.stringify(transactions));
        alert("Data saved successfully!");
    }

    function loadFromLocalStorage() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        expenses.forEach(expense => {
            createEditableEntry(expenseContainer, "expense");
            const lastEntry = expenseContainer.lastElementChild;
            lastEntry.querySelector("input[type='date']").value = expense.date;
            lastEntry.querySelector("input[type='text']").value = expense.text;
        });

        transactions.forEach(transaction => {
            createEditableEntry(transactionContainer, "transaction");
            const lastEntry = transactionContainer.lastElementChild;
            lastEntry.querySelector("input[type='date']").value = transaction.date;
            lastEntry.querySelector("input[type='text']").value = transaction.text;
        });
    }

    addExpenseButton.addEventListener("click", () => createEditableEntry(expenseContainer, "expense"));
    addTransactionButton.addEventListener("click", () => createEditableEntry(transactionContainer, "transaction"));
    saveDataButton.addEventListener("click", saveToLocalStorage);

    loadFromLocalStorage();
});
