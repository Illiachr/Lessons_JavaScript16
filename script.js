let money = 30000,
    income = 'Фриланс',
    addExpenses = 'Интернет, Мобильный, Коммуналка',
    deposit = false,
    mission = 10000,
    period = '12',
    budgetDay = money / 30;

const arrExpensesLow = addExpenses.toLowerCase().split(',');

console.log(
    `variable 'money' type is ${typeof money},
variable 'income' type is ${typeof income},
variable 'income' type is ${typeof deposit},
string 'addExpenses' lenght is ${addExpenses.length}.

Период равен ${period} месяцев
Цель заработать ${mission} долларов США

Дополнительные расходы:
${arrExpensesLow}

budgetDay ${budgetDay} гривен`    
);

console.log (arrExpensesLow);