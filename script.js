const money = 30000;
const income = 'Фриланс';
const addExpenses = 'Интернет, Мобильный, Коммуналка';
const deposit = false;
const mission = 10000;
const period = '12';
const budgetDay = money / 30;

addExpensesLow = addExpenses.toLowerCase().split(',');

console.log(
    `variable 'money' type is ${typeof money},
variable 'income' type is ${typeof income},
string 'addExpenses' lenght is ${addExpenses.length}.

Период равен ${period} месяцев
Цель заработать ${mission} долларов США

Дополнительные расходы
    ${addExpenses.toLowerCase().split(',')}
Заработок в день (budgetDay) ${budgetDay} гривен
    `    
);

//    - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль

//    - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)

//    - Вывести в консоль budgetDa