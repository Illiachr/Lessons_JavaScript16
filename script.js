'use strict';

let money = 0,
    income = 'Фриланс',
    addExpenses = '',
    deposit = true,
    mission = 100000,
    period = '12',
    expenses1 = '',
    amount1 = 0,
    expenses2 = '',
    amount2 = 0,
    budgetMonth = 0,
    budgetDay = 0;

money = +prompt ('Ваш месячный доход?',30000);
if (isNaN(money)) {
    money = 0;
} else {
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Мобильный, Коммуналка');
    deposit = confirm ('Есть ли у вас депозит в банке?', false);

    expenses1 = prompt ('Введите обязательную статью расходов', 'Нет обязательных расходов');        
    amount1 = +prompt ('Во сколько это обойдется', 0);            
    if (isNaN(amount1)) amount1 = 0;

    expenses2 = prompt ('Введите обязательную статью расходов', 'Других обязательных расходов нет');
    amount2 = +prompt ('Во сколько это обойдется', 0);
    if (isNaN(amount2)) amount2 = 0;
}

const re = /\s*,\s*/; //Выражение для того чтобы взять слова из строка без пробелов вокруг.
const arrExpensesLow = addExpenses.toLowerCase().split(re);

budgetMonth = money - amount1 - amount2;
budgetDay = Math.floor(budgetMonth / 30);

console.log(
    `variable 'money' type is ${typeof money},
variable 'income' type is ${typeof income},
variable 'deposit' type is ${typeof deposit},
string 'addExpenses' lenght is ${addExpenses.length}.

Период равен ${period} месяцев
Цель заработать ${mission} гривен

bugetMonth = ${budgetMonth} гривен
budgetDay = ${budgetDay} гривен

`,
arrExpensesLow  
);

if (budgetDay >= 1200) console.log('У Вас высокий уровень дохода');
    else if (budgetDay > 600 && budgetDay < 1200) console.log('У Вас средний уровень дохода');
        else if (budgetDay > 0 && budgetDay <= 600) console.log('К сожалению у Вас уровень дохода ниже среднего');
            else if (budgetDay <= 0) console.log('Что-то пошло не так!');

if (budgetMonth > 0) {
    let richTarget = Math.ceil(mission/budgetMonth);
    if (richTarget === 1) {
        console.log(`Цель будет достигнута за ${richTarget} месяц`);
    } else if (richTarget > 1 && richTarget <= 4) {
        console.log(`Цель будет достигнута за ${richTarget} месяца`);
    } else console.log(`Цель будет достигнута за ${richTarget} месяцев`);
} else console.log ('Если Вы не будете зарабатывать, то не сможете достичь цели');
