'use strict';
let startBtn = document.getElementById('start'),
    buttons = document.getElementsByTagName('button'),
        incomeAdd = buttons[0],
        expensesAdd = buttons[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    resultTotal = document.querySelectorAll('.result-total'),
        budgetDayValue      = resultTotal[1],
        expensesMonthValue  = resultTotal[2],
        addIncomeValue      = resultTotal[3],
        addExpensesValue    = resultTotal[4],
        periodValue         = resultTotal[5],
        targetMonthValue    = resultTotal[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value');

const isNumber = (x) => {
    return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
    }, 
// Функция запроса данных от пользователя
    askDataNum = (askQuestion, defAnswer) => { 
        let result;        
            result = prompt (askQuestion, defAnswer);
            if (result <= 0 || !isNumber(result)) {
                return askDataNum(askQuestion, 'Введите число');
            } else {
                return result;
            }               
    },
    askDataStr = (askQuestion, defAnswer) => { 
        let result = prompt (askQuestion, defAnswer);
        if (!isNaN(+result) || 
            result.trim() < 1 || 
            result.trim() === 'Введите строку') {
            return askDataStr(askQuestion, 'Введите строку');
        }
        return result;
    };

let appData = {
        budget          : 0,
        income          : {},
        addIncome       : [],
        Expenses        : {},
        addExpenses     : [],
        deposit         : false,
        depositSum      : 0,
        depositPercent  : 0,        
        budgetDay       : 0,
        budgetMonth     : 0,
        expensesMonth   : 0,
        incomeMonth     : 0,
        
        start () {
            appData.budget = +salaryAmount.value;

            this.getExpenses();
            this.getIncome();            
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();

            this.showResult();
        },

        showResult () {
            budgetMonthValue.value = appData.budget;
            budgetDayValue.value = Math.floor(appData.budgetDay);
            expensesMonthValue.value = appData.expensesMonth;

            addExpensesValue.value = appData.addExpenses.join(', ');
            addIncomeValue.value = this.addIncome.join(', ');
            periodValue.value = this.calcPeriod();
            targetMonthValue.value = Math.ceil(this.getTargetMonth());

            periodSelect.addEventListener('change', event => {
                event.preventDefault();
                this.period = periodSelect.value;
                periodValue.value = this.calcPeriod();
                
            });
        },
        
        addExpensesBlock () { 
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
            expensesItems = document.querySelectorAll('.expenses-items');

            if(expensesItems.length === 3) {
                expensesAdd.style.display = 'none';
            }
        }, 

        addIncomeBlock() {
            let cloneItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneItem,incomeAdd);

            incomeItems = document.querySelectorAll('.income-items');

            if(incomeItems.length === 3) {
                incomeAdd.style.display = 'none';
            }
        },

        getExpenses () {
            expensesItems.forEach( item => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;

                if(itemExpenses !== '' && cashExpenses !== '') {
                    this.Expenses[itemExpenses] = cashExpenses;
                }
            });
        },

        getIncome() {
            incomeItems.forEach( item => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;

                if(itemIncome && cashIncome) {
                    this.income[itemIncome] = cashIncome;
                    this.incomeMonth += +this.income[itemIncome];
                }
            });
        },

        getAddExpenses () {
            let addExpenses = additionalExpenses.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        },

        getAddIncome () {
            additionalIncome.forEach((item) => {
                let itemValue = item.value.trim();
                this.addIncome.push(itemValue);
            });
        },

        getExpensesMonth () {
            for (let key in this.Expenses) {                    
                this.expensesMonth = this.expensesMonth + parseFloat(appData.Expenses[key]);
            }  
        },
        
        getBudget () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth/30);
        },
        
        getTargetMonth () {                
            return targetAmount.value/this.budgetMonth;
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
        },

        calcPeriod () {
            return appData.budgetMonth*periodSelect.value;
        }

    };

startBtn.addEventListener('click', event => {
    event.preventDefault();
    if(salaryAmount.value === '' || !isNumber(salaryAmount.value)) {
        alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
    } else {
    appData.start();
    }
});

expensesAdd.addEventListener('click', event => {
    event.preventDefault();
    appData.addExpensesBlock();
});

incomeAdd.addEventListener('click', event => {
    event.preventDefault();
    appData.addIncomeBlock();
});


periodSelect.addEventListener('input', event => {
    event.preventDefault();
    appData.period = periodSelect.value;
    periodAmount.textContent = appData.period;    
});