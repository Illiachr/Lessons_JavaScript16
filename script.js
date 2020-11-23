'use strict';

// 9) Написать конструкцию условий (расчеты приведены в рублях)
// Если budgetDay больше 1200, то “У вас высокий уровень дохода”
// Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
// Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
// Если отрицательное значение то вывести “Что то пошло не так”
// Учесть варианты 0, 600 и 1200 (к какому уровню не важно)
// 10) Проверить, чтобы все работало и не было ошибок в консоли
// 11) Добавить папку с третьим уроком в свой репозиторий на GitHub

let money = +prompt ('Ваш месячный доход?',30000),
    income = 'Фриланс',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Мобильный, Коммуналка'),
    deposit = confirm ('Есть ли у вас депозит в банке?', false),
    mission = 100000,
    period = '12',
    expenses1 = prompt ('Введите обязательную статью расходов', 'Нет обязательных расходов'),
    amount1 = +prompt ('Во сколько это обойдется', 0),
    expenses2 = prompt ('Введите обязательную статью расходов', 'Нет обязательных расходов'),
    amount2 = +prompt ('Во сколько это обойдется', 0),
    budgetMonth = money - amount1 - amount2,
    budgetDay = budgetMonth / 30;
    
const re = /\s*,\s*/; //регулярное выражение, чтобы выделить слова без пробелов вокруг, разделитель запятая

const arrExpensesLow = addExpenses.toLowerCase().split(re);

switch (budgetDay) {
    case budgetDay >= 1200:
        alert('У Вас высокий уровень дохода');
        console.log('У Вас высокий уровень дохода');
        break;
    case budgetDay > 600 && budgetDay < 1200:
        alert('У Вас средний уровень дохода');
        console.log('У Вас средний уровень дохода');
        break;
    case budgetDay <= 600:
        alert('К сожалению у Вас уровень дохода ниже среднего');
        console.log('К сожалению у Вас уровень дохода ниже среднего');
        break;
    case budgetDay <= 0 || budgetDay === NaN:
        alert('Что-то пошло не так');
        console.log('Что-то пошло не так');
        break;
}

console.log(
    `variable 'money' type is ${typeof money},
variable 'income' type is ${typeof income},
variable 'deposit' type is ${typeof deposit},
string 'addExpenses' lenght is ${addExpenses.length}.

Период равен ${period} месяцев
Цель заработать ${mission} гривен

bugetMonth = ${budgetMonth} гривен
budgetDay = ${Math.floor(budgetDay)} гривен

Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев

`,
arrExpensesLow  
);