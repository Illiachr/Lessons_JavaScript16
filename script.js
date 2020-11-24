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
//    budgetMonth = 0,
    budgetDay = 0;

money = +prompt ('Ваш месячный доход?',30000);
if (isNaN(money)) {
    money = 0;
} else {
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 
    'Интернет, Мобильный, Коммуналка');
    deposit = confirm ('Есть ли у вас депозит в банке?', false);

    expenses1 = prompt ('Введите обязательную статью расходов', 'Нет обязательных расходов');        
    amount1 = +prompt ('Во сколько это обойдется', 0);            
    if (isNaN(amount1)) {amount1 = 0;}

    expenses2 = prompt ('Введите обязательную статью расходов', 'Других обязательных расходов нет');
    amount2 = +prompt ('Во сколько это обойдется', 0);
    if (isNaN(amount2)) {amount2 = 0;}
}

const showTypeOf = function(data) {
    return `${data}: ${typeof(data)}`;
};

const re = /\s*,\s*/; //Выражение для того чтобы взять слова из строка без пробелов вокруг.
addExpenses = addExpenses.toLowerCase().split(',');
for (let i = 0; i < addExpenses.length; i++) {
    addExpenses[i] = addExpenses[i].trim();
}
const getExpensesMonth = function (amntExpn1, amntExpn2) {
    return amntExpn1 + amntExpn2;
};

const getAccumulatedMonth = function (totalIncome, amntExpn1, amntExpn2, callback){
    return money - getExpensesMonth(amntExpn1, amntExpn2);
};

let accumulatedMonth = getAccumulatedMonth (money, amount1, amount2, getExpensesMonth);
budgetDay = Math.floor(accumulatedMonth/ 30);

const getTargetMonth = function(target, accM){    
    if (accM > 0) {
        let richTarget = Math.ceil(target/accM);
        return richTarget === 1 ? `Цель будет достигнута за ${richTarget} месяц` :
        richTarget > 1 && richTarget <= 4 ? `Цель будет достигнута за ${richTarget} месяца` : 
        `Цель будет достигнута за ${richTarget} месяцев`;
        } else { return 'Если Вы не будете зарабатывать, то не сможете достичь цели'; }
};

// - вызовы функции showTypeOf

//  - Расходы за месяц вызов getExpensesMonth

//  - Вывод возможных расходов в виде массива (addExpenses)

//  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 

//  - Бюджет на день (budgetDay)

//  - вызов функции getStatusIncome


// if (budgetDay >= 1200) {console.log('У Вас высокий уровень дохода');}
//     else if (budgetDay > 600 && budgetDay < 1200) {console.log('У Вас средний уровень дохода');}
//         else if (budgetDay > 0 && budgetDay <= 600) {console.log('К сожалению у Вас уровень дохода ниже среднего');}
//             else if (budgetDay <= 0 || budgetDay !== 'number') {console.log('Что-то пошло не так!');}
const getStatusIncome = ((bD) => {
    return bD >= 1200 ? 'У Вас высокий уровень дохода' :
        bD > 600 && bD < 1200 ? 'У Вас средний уровень дохода' :
        bD > 0 && bD <= 600 ? 'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
});

console.log (showTypeOf(money));
console.log (showTypeOf(income));
console.log (showTypeOf(deposit));
console.log (getExpensesMonth(amount1, amount2));
console.log (addExpenses);
console.log(`Бюджет на день: ${budgetDay} гривен`);
console.log (getStatusIncome(budgetDay));
console.log (getTargetMonth(mission, accumulatedMonth));

if (accumulatedMonth > 0) {
    let richTarget = getTargetMonth(mission,accumulatedMonth);
    if (richTarget === 1) {
        console.log(`Цель будет достигнута за ${richTarget} месяц`);
    } else if (richTarget > 1 && richTarget <= 4) {
        console.log(`Цель будет достигнута за ${richTarget} месяца`);
    } else {console.log(`Цель будет достигнута за ${richTarget} месяцев`);}
} else {console.log ('Если Вы не будете зарабатывать, то не сможете достичь цели');}

