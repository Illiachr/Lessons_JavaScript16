'use strict';
const startBtn = document.getElementById('start'),
    buttons = document.getElementsByTagName('button'),
        incomeAdd = buttons[0],
        expensesAdd = buttons[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncome = document.querySelectorAll('.additional_income-item'),
    resultTotal = document.querySelectorAll('.result-total'),
        budgetDayValue = resultTotal[1],
        expensesMonthValue = resultTotal[2],
        addIncomeValue= resultTotal[3],
        addExpensesValue= resultTotal[4],
        periodValue= resultTotal[5],
        targetMonthValue= resultTotal[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items>.income-title'),
    incomeAmount = document.querySelector('.income-items>.income-amount'),
    expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
    expensesAmount = document.querySelector('.expenses-items>.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value');

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

console.log('Кнопка "Рассчитать" через id:');
console.log(start);
console.log('Кнопки “+” (плюс) через Tag, каждая в своей переменной:');
console.log(incomeAdd, expensesAdd);
console.log('Чекбокс по id через querySelector:');
console.log(depositCheck);
console.log('Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll: ');
console.log('addIncome', addIncome);
console.log(`Каждый элемент в правой части программы через класс(не через querySelector), 
которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value"`);    
console.log(budgetDayValue, expensesMonthValue, addIncomeValue,addExpensesValue, periodValue, targetMonthValue);    
console.log(`Оставшиеся поля через querySelector каждый в отдельную переменную : 
поля ввода (input) с левой стороны и range.`);    
console.log('salaryAmount: ', salaryAmount);
console.log('incomeTitle: ', incomeTitle);
console.log('incomeAmount: ', incomeAmount);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpenses: ', additionalExpenses);
console.log('depositBank: ', depositBank);
console.log('depositAmount: ', depositAmount);
console.log('depositPercent: ', depositPercent);
console.log('targetAmount: ', targetAmount);
console.log('periodSelect: ', periodSelect);
console.log('periodAmount: ', periodAmount);
console.log('budgetMonthValue: ', budgetMonthValue);