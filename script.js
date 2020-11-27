'use strict';

const isNumber = ((x) => {
    return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
});

let money,
    start = (() => {
        do {
            money = prompt('Ваш месячный доход?','30000');
        } while (!isNumber(money));
        money = parseFloat(money);
    });

start();

let appData = {
        budget          : 0,
        income          : {},
        addIncome       : [],
        Expenses        : {},
        addExpenses     : [],
        deposit         : false,
        mission         : 100000,
        period          : 12,
        budgetDay       : 0,
        budgetMonth     : 0,
        expensesMonth   : 0,
        richTarget      : 0,
        asking          : (() => {
            appData.addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Мобильный, Коммуналка').toLowerCase().split(',');
            appData.deposit = confirm ('Есть ли у вас депозит в банке?', false);

            let i = 0;
            let key = '';
            for (i ; i < 4; i++) {
                key = prompt ('Введите обязательную статью расходов');
                do {
                appData.Expenses[key] = prompt ('Во сколько это обойдется', '0');
                } while (!isNumber(appData.Expenses[key]));
            }
        }),

        getExpensesMonth : (() => {
            for (let key in appData.Expenses) {                    
                appData.expensesMonth = appData.expensesMonth + parseFloat(appData.Expenses[key]);
            }  
        }),
        
        getBudget : (() => {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth/30);
        }),
        
        getTargetMonth      : (() => {                
                appData.richTarget = Math.ceil(appData.mission/appData.budgetMonth);
        }),
        
        getStatusIncome : (() => {
            return appData.budgetDay >= 1200 ? 'У Вас высокий уровень дохода' :
                appData.budgetDay > 600 && appData.budgetDay < 1200 ? 'У Вас средний уровень дохода' :
                appData.budgetDay > 0 && appData.budgetDay <= 600 ? 
                'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
        })        
    };

appData.budget = parseFloat(money);
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log (`Расходы за месяц: ${appData.expensesMonth} гривен`);
console.log (`Цель будет достигнута за ${appData.richTarget} месяцев`);
console.log(appData.getStatusIncome());

console.log (`Наша программа включает в себя следующие данные:`);
for (let key in appData) {
    console.log(`${key} : ${appData[key]}`);
}