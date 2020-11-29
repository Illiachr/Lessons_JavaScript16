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
        asking () {
            this.addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Мобильный, Коммуналка')
            .toLowerCase().split(',')
            .map(item => item = item.trim());
            this.deposit = confirm ('Есть ли у вас депозит в банке?', false);

            let i = 0;
            let key = '';
            for (i ; i < 4; i++) {
                key = prompt ('Введите обязательную статью расходов');
                do {
                    this.Expenses[key] = prompt ('Во сколько это обойдется', '0');
                } while (!isNumber(this.Expenses[key]));
            }
        },

        getExpensesMonth () {
            for (let key in this.Expenses) {                    
                this.expensesMonth = this.expensesMonth + parseFloat(appData.Expenses[key]);
            }  
        },
        
        getBudget () {
            this.budgetMonth = this.budget - this.expensesMonth;
            this.budgetDay = Math.floor(appData.budgetMonth/30);
        },
        
        getTargetMonth () {                
            this.richTarget = Math.ceil(this.mission/this.budgetMonth);
            if (this.richTarget > 0)    {
                console.log (`Цель будет достигнута за ${this.richTarget} месяца`);
            } else {
                console.log(`Цель не достижима! Необходимо получать доход`);
            }
        },
        
        getStatusIncome () {
            return appData.budgetDay >= 1200 ? 'У Вас высокий уровень дохода' :
                appData.budgetDay > 600 && appData.budgetDay < 1200 ? 'У Вас средний уровень дохода' :
                appData.budgetDay > 0 && appData.budgetDay <= 600 ? 
                'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
        }        
    };

appData.budget = parseFloat(money);
appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log (`Расходы за месяц: ${appData.expensesMonth} гривен`);
appData.getTargetMonth();
//console.log (`Цель будет достигнута за ${appData.richTarget} месяцев`);
console.log(appData.getStatusIncome());

console.log (`
------------------------------------------------
Наша программа включает в себя следующие данные:
------------------------------------------------
`);
for (let key in appData) {
    if (appData.hasOwnProperty(key))
    {
        if (key === 'income' || key === 'Expenses') {
            console.log(`${key} : `);
            console.log(appData[key]);
            
        } else{
            console.log(`${key} : ${appData[key]}`);
        }
    }
}