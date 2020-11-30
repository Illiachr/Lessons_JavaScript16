'use strict';

const isNumber = ((x) => {
    return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
    }), 
// Функция запроса данных от пользователя
    askDataNum = ((askQuestion, defAnswer) => { 
        let result;        
            result = prompt (askQuestion, defAnswer);
            if (result <= 0 || !isNumber(result)) {
                return askDataNum(askQuestion, 'Введите число');
            } else {
                return result;
            }               
    }),
    askDataStr = ((askQuestion, defAnswer) => { 
        let result = prompt (askQuestion, defAnswer);
        if (!isNaN(+result) || 
            result.trim() < 1 || 
            result.trim() === 'Введите строку') {
            return askDataStr(askQuestion, 'Введите строку');
        }
        return result;
    });

let appData = {
        budget          : 0,
        income          : {},
        addIncome       : [],
        Expenses        : {},
        addExpenses     : [],
        deposit         : false,
        depositSum      : 0,
        depositPercent  : 0,        
        period          : 12,
        mission         : 100000,
        budgetDay       : 0,
        budgetMonth     : 0,
        expensesMonth   : 0,
        richTarget      : 0,
        
        asking () {
            if (confirm ('Есть ли у Вас дополнительный заработок?')){
                let key = askDataStr('Какой у Вас есть дополнительный заработок?', 'Сдаю квартиру');
                this.income[key] = +askDataNum ('Какой доход от дополнительного заработка?', 5000);
            }
            this.addExpenses = askDataStr('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Мобильный, Коммуналка')
            .toLowerCase().split(',')
            .map(item => item = item.trim());
            this.deposit = confirm ('Есть ли у вас депозит в банке?', false);
            appData.getInfoDeposit();
            do {
                let key = askDataStr ('Введите обязательную статью расходов');
                this.Expenses[key] = askDataNum ('Во сколько это обойдется', '0');
            } while (confirm ('Хотите добавить ещё?'));
        },

        getExpensesMonth () {
            for (let key in this.Expenses) {                    
                this.expensesMonth = this.expensesMonth + parseFloat(appData.Expenses[key]);
            }  
        },
        
        getBudget () {
            this.budgetMonth = this.budget - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth/30);
        },
        
        getTargetMonth () {                
            this.richTarget = this.mission/this.budgetMonth;
        },
        
        getStatusIncome () {
            return appData.budgetDay >= 1200 ? 'У Вас высокий уровень дохода' :
                appData.budgetDay > 600 && appData.budgetDay < 1200 ? 'У Вас средний уровень дохода' :
                appData.budgetDay > 0 && appData.budgetDay <= 600 ? 
                'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
        },

        getInfoDeposit () {
            if (this.deposit) {
                this.depositSum = +askDataNum('Добавьте сумму депозита (грн)', 0);
                this.depositPercent = +askDataNum('Добавьте ставку по депозиту (%)', 2);
            }
        }

    };

const start = (() => {        
    appData.budget = +askDataNum('Ваш месячный доход?', '30000');
    appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    console.log (`Расходы за месяц: ${appData.expensesMonth} гривен`);
    appData.getTargetMonth();
    if (appData.richTarget > 0)    {
        console.log (`Цель будет достигнута за ${Math.ceil(appData.richTarget)} месяца`);
    } else {
        console.log(`Цель не достижима! Необходимо получать доход :(`);
    }
    console.log(appData.getStatusIncome());
});

start();

console.log('Дополнительные расходы (addExpenses):',
    appData.addExpenses
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(', '));
console.log(appData.addExpenses);
console.log (`
------------------------------------------------
Наша программа включает в себя следующие данные:
------------------------------------------------
`);
for (let key in appData) {
    if (appData.hasOwnProperty(key))
    {
        if (key === 'Expenses') {
            console.log(`${key} : `);
            console.log(appData[key]);            
        } else{
            console.log(`${key} : ${appData[key]}`);
        console.log ('------------------------------------------------');
        }        
    }
}