'use strict';

let money,
    income = 'Фриланс',
    addExpenses = '',
    deposit = true,
    mission = 100000,
    period = '12',
    amountSum = 0,  
    budgetDay = 0;

const userExpenses = {
        expenses: [],
        amount: []
    };

const showTypeOf = function(data) {
    return `${data}: ${typeof(data)}`;
};

const isNumber = ((x) => {
    return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
});

const start = (() => {
    do {
        money = prompt('Ваш месячный доход?','30000');
    } while (!isNumber(money));
    money = parseFloat(money);
});

start();

addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 
'Интернет, Мобильный, Коммуналка');
deposit = confirm ('Есть ли у вас депозит в банке?', false);

addExpenses = addExpenses.toLowerCase().split(',');
for (let i = 0; i < addExpenses.length; i++) {
    addExpenses[i] = addExpenses[i].trim();
}

const getExpensesMonth = (() => {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        userExpenses.expenses[i] = prompt ('Введите обязательную статью расходов', ''); 
        do {
            userExpenses.amount[i] = prompt ('Во сколько это обойдется', '0');        
        } while (!isNumber(userExpenses.amount[i]));
        
        userExpenses.amount[i] = parseFloat(userExpenses.amount[i]);
        sum = sum + userExpenses.amount[i];
    } 
    return sum;    
});

amountSum = getExpensesMonth();
const getAccumulatedMonth = ((sum) => {
    return money - sum;
});

let accumulatedMonth = getAccumulatedMonth(amountSum);
budgetDay = Math.floor(accumulatedMonth/ 30);

const getTargetMonth = ((target, accM) => {    
    if (accM > 0) {
        let richTarget = Math.ceil(target/accM);
        return richTarget === 1 ? `Цель будет достигнута за ${richTarget} месяц` :
        richTarget > 1 && richTarget <= 4 ? `Цель будет достигнута за ${richTarget} месяца` : 
        `Цель будет достигнута за ${richTarget} месяцев`;
        } else { return 'Если Вы не будете зарабатывать, то не сможете достичь цели'; }
});

const getStatusIncome = ((bd) => {
    return bd >= 1200 ? 'У Вас высокий уровень дохода' :
        bd > 600 && bd < 1200 ? 'У Вас средний уровень дохода' :
        bd > 0 && bd <= 600 ? 'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
});

console.log (showTypeOf(money));
console.log (showTypeOf(income));
console.log (showTypeOf(deposit));
console.log (`Расходы за месяц ${amountSum}`);
console.log (addExpenses);
console.log(`Бюджет на день: ${budgetDay} гривен`);
console.log (getStatusIncome(budgetDay));
console.log (getTargetMonth(mission, accumulatedMonth));
console.log (userExpenses);