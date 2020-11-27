'use strict';

const isNumber = ((x) => {
    return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
});

let toLow = ((arr) => { //TODO: заменить на for in    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
});

const richTargetOutput = ((richTarget) => {
    let str = '';
    if (richTarget > 0) {
                richTarget === 1 ? str = `Цель будет достигнута за ${richTarget} месяц` :
                richTarget > 1 && richTarget <= 4 ? 
                                    str = `Цель будет достигнута за ${richTarget} месяца` : 
                                    str = `Цель будет достигнута за ${richTarget} месяцев`;
                } else {            str = 'Если Вы не будете зарабатывать, то не сможете достичь цели'; }
});


let money,
    expensesMinth = 0,  //TODO: DEL
    budgetDay = 0,  //TODO: DEL
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
        asking          : (() => {
            appData.addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Мобильный, Коммуналка').toLowerCase().split(',');
            appData.deposit = confirm ('Есть ли у вас депозит в банке?', false);

            let i = 0;
            let key = '';            
                key = prompt ('Введите обязательную статью расходов', '');
                appData.Expenses[key] = prompt ('Во сколько это обойдется', '0');
                do {
                key = prompt ('Введите обязательную статью расходов', '');
                appData.Expenses[key] = prompt ('Во сколько это обойдется', '0');
                } while (!isNumber(appData.Expenses[key]));
            //    i++;
            //    } while (i < 4 || key !== null || key !== '');
        }),

        getExpensesMonth : (() => {
            let sum = 0;
            //for (let key of appData.Expenses) {    
                //appData.Expenses.key.value = parseFloat(appData.Expenses.key.value); //TODO: DEL
                //sum = sum + appData.Expenses.key.value;
            //} 
            return sum;    
        }),
        
        getAccumulatedMonth : (() => {
            return money - appData.getExpensesMonth();        
        }),
        
        getTargetMonth      : (() => {                
                return Math.ceil(appData.mission/appData.getAccumulatedMonth());
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
expensesMonth = appData.getExpensesMonth()
//appData.budgetDay = Math.floor(appData.accumulatedMonth/ 30);



//console.log (`Расходы за месяц ${appData.accumulatedMonth}`);
console.log (appData.addExpenses);
//console.log(`Бюджет на день: ${appData.budgetDay} гривен`);
//console.log (appData.getStatusIncome());
//console.log (appData.getTargetMonth());
console.log (appData.Expenses);