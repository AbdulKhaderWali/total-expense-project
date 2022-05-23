//variable for adding expenses
let totalExpense = 0;
//This is for sorting purpose
let ascending = true;
const inputElement = document.querySelector("#inputAmount");
const textEl = document.querySelector("#desc");
const nameEl = document.querySelector("#personName");
const sortBtn = document.querySelector("#sort");
//get the heading to insert value in h1 tag
const headingEl = document.querySelector("#heading");
//reference for table div
const tablediv = document.querySelector("#tableEl");
//setting heading content
headingEl.textContent = totalExpense;
//function for adding total expenses
const allExpenses = [];
function addExpensetotal() {
    // Storing input value in textAmount
    const expenseItem = {};
    const textAmount = inputElement.value;
    const textDesc = textEl.value;
    const being = nameEl.value;
    // Converting string into number (10 is there because we have to convert it into decimal value)
    const expense = parseInt(textAmount, 10);
    totalExpense = totalExpense + expense;
    //we have to change the content in h1 every time fuction is called
    printHeading();

    //setting desc and amount in expenseItem object
    expenseItem.desc = textDesc;
    expenseItem.amount = expense;
    expenseItem.moment = new Date();
    expenseItem.name = being;
    allExpenses.push(expenseItem);
    deletedAmount.push(expenseItem.amount);
    createListItem(expenseItem);

}

function printHeading() {
    const someText = `Total : ${totalExpense}`
    headingEl.textContent = someText;

}

function getDateString(moment) {
    return moment.toLocaleDateString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
}
deletedAmount = [];
function deleteItem(value) {

    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].moment.valueOf() === value) {
            totalExpense = totalExpense - deletedAmount[i];
            printHeading();
            deletedAmount.splice(i, 1);
            allExpenses.splice(i, 1);
            printTable();

        }
    }
}

let row = 1;
function createListItem({ desc, amount, moment, name }) {
    const newRow = tablediv.insertRow(row);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = `&nbsp ${name} &nbsp`;
    cell2.innerHTML = desc;
    cell3.innerHTML = amount;
    cell4.innerHTML = `<button
                                type="button"
                                class="btn btn-outline-danger btn-sm"
                                onclick="deleteItem(${moment.valueOf()})"
                                >
								<i class="fas fa-trash-alt"></i>
								</button>;`
    row = 1 + row;

}

function printTable() {
    tablediv.innerHTML = `<table>
                    <tr>
                        <th> Name </th>
                        <th> Spent on </th>
                        <th> Amount </th>
                        <th> Delete </th>
                    </tr>
                </table>`;
    row = 1;
    allExpenses.map(expense => createListItem(expense));
}

function sortAmount() {
    if (ascending) {
        allExpenses.sort(function (a, b) {
            return a.amount - b.amount;
        })

        deletedAmount.sort(function (a, b) {
            return a - b;
        })

    }
    else {
        allExpenses.sort(function (a, b) {
            return b.amount - a.amount;
        })
        deletedAmount.reverse();

    }
    ascending = !ascending;
    printTable();
}

//Getting button in element
const element = document.querySelector("#btnAddExpense");
//Listen to the button cllick
sortBtn.addEventListener("click", sortAmount, false);
element.addEventListener("click", addExpensetotal, false);