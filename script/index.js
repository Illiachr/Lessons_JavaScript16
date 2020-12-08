document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const regInputSum = /[^\d]/g,
        regInputDescr =  /[^аА-яёЯЁ, ]/;

    const startBtn = document.getElementById('start'),
        cancelBtn = document.querySelector('#cancel'),
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
        budgetMonthValue = document.querySelector('.budget_month-value'),
        depositСalc = document.querySelectorAll('.deposit-calc');

    const isNumber = (x) => {
        return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
        };

    const appData = {
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
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();            
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getInfoDeposit();

        this.showResult();
        console.log(this);
    },
    
        showResult () {
            budgetMonthValue.value = this.budget;
            budgetDayValue.value = Math.floor(appData.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            if (this.addExpenses[0] !== '') {
                    addExpensesValue.value = this.addExpenses.map(
                    (item) => item[0].toUpperCase() + item.slice(1)
                ).join(', ');
            }
            if (this.addIncome[0] !== '') {
            addIncomeValue.value = this.addIncome.map(
                (item) => item[0].toUpperCase() + item.slice(1)
            ).join(', ');
            }
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
            let cloneChildNodes = cloneExpensesItem.childNodes;
            cloneChildNodes[1].value = '';
            cloneChildNodes[3].value = '';
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

            if(document.querySelectorAll('.expenses-items').length === 3) {
                expensesAdd.style.display = 'none';
            }
        }, 

        addIncomeBlock() {
            let cloneItem = incomeItems[0].cloneNode(true);
            let cloneChildNodes = cloneItem.childNodes;
            cloneChildNodes[1].value = '';
            cloneChildNodes[3].value = '';
            incomeItems[0].parentNode.insertBefore(cloneItem,incomeAdd);

            if(document.querySelectorAll('.income-items').length === 3) {
                incomeAdd.style.display = 'none';
            }
        },

        getExpenses () {

            document.querySelectorAll('.expenses-items').forEach( item => {
                let itemExpenses = item.querySelector('.expenses-title').value.toLowerCase();
                let cashExpenses = item.querySelector('.expenses-amount').value;

                if(itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                    this.Expenses[itemExpenses] = parseFloat(cashExpenses);
                }
            });
        },

        getIncome() {
            document.querySelectorAll('.income-items').forEach( item => {
                let itemIncome = item.querySelector('.income-title').value.toLowerCase();
                let cashIncome = item.querySelector('.income-amount').value;

                if(itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                    this.income[itemIncome] = parseFloat(cashIncome);
                    this.incomeMonth += +this.income[itemIncome];
                }
            });
        },

        getAddExpenses () {
            let addExpenses = additionalExpenses.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item.toLowerCase());
                }
            });
        },

        getAddIncome () {
            additionalIncome.forEach((item) => {
                let itemValue = item.value.trim().toLowerCase();
                this.addIncome.push(itemValue);
            });
        },

        getExpensesMonth () {
            for (let key in this.Expenses) {                    
                this.expensesMonth +=  +appData.Expenses[key];
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
// TODO предложение ввода данных по депозиту и предупреждение о пустых полях
        getInfoDeposit () {
            if (this.deposit && depositAmount.value.trim() !== '' && depositPercent.value)
            {
                this.depositSum = +depositAmount.value;
                this.depositPercent = +depositPercent.value;
                console.log(this);
            }                
        },

        calcPeriod () {
            return this.budgetMonth*periodSelect.value;
        },

        reset () {
            const inputTextData = document.querySelectorAll('.data input[type = text]'),
                resultInputAll = document.querySelectorAll('.result input[type = text]'),
                incItms = document.querySelectorAll('.expenses-items'),
                expItms = document.querySelectorAll('.income-items');
                
            inputTextData.forEach(elem => {
                elem.value = '';
                elem.removeAttribute('disabled');
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value; 
            });
            resultInputAll.forEach(elem => {
                elem.value = '';
            });
            
            for (let i = 1; i < incItms.length; i++) {
                incItms[i].parentNode.removeChild(incItms[i]);
                incomeAdd.style.display = 'block';
            }
            
            for (let i = 1; i < expItms.length; i++) {
                expItms[i].parentNode.removeChild(expItms[i]);
                expensesAdd.style.display = 'block';
            }
            
            this.budget = 0;
            this.income          = {};
            this.addIncome       = [],
            this.Expenses        = {};
            this.addExpenses     = [];
            this.deposit         = false;
            this.depositSum      = 0;
            this.depositPercent  = 0;        
            this.budgetDay       = 0;
            this.budgetMonth     = 0;
            this.expensesMonth   = 0;
            this.incomeMonth     = 0;
            
            cancelBtn.style.display = 'none';
            startBtn.style.display = 'block';
            incomeAdd.removeAttribute('disabled');
            expensesAdd.removeAttribute('disabled');
            depositCheck.checked = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
        }
    };    

    const validateInput = () => {
        const inputText = document.querySelectorAll('.data input[placeholder="Наименование"]'),
            inputNum = document.querySelectorAll('.data input[placeholder="Сумма"]');

        inputText.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(regInputDescr, '');
            });
        });

        inputText.forEach(item => {
            item.addEventListener('blur', () => {
                item.value = item.value.replace(regInputDescr, '');
            });
        });

        inputNum.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(regInputSum, '');
            });
        });

        inputNum.forEach(item => {
            item.addEventListener('blur', () => {
                item.value = item.value.replace(regInputSum, '');
            });
        });
    };

    validateInput();

    startBtn.addEventListener('click', event => {
        event.preventDefault();
        if(salaryAmount.value === '') {
            startBtn.disabled = true;
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        } 
        appData.start();
        document.querySelectorAll('.data input[type="text"]').forEach(
            item => item.disabled = true
        );
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    });

    salaryAmount.addEventListener('click', () => {
        startBtn.disabled = false;
    });

    cancelBtn.addEventListener('click', () => {
        appData.reset();
    });

    expensesAdd.addEventListener('click', () => {
        appData.addExpensesBlock();
        validateInput();
    });


    incomeAdd.addEventListener('click', () => {
        appData.addIncomeBlock();
        validateInput();
    });

    document.querySelector('.deposit-label').addEventListener('click', () => {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none'; 
        appData.deposit = false;

        if (depositCheck.checked){
            depositBank.style.display = 'block';
            depositAmount.style.display = 'inline';
            depositPercent.style.display = 'inline';
            appData.deposit = true;
        }
    });

    periodSelect.addEventListener('input', () => {
        appData.period = periodSelect.value;
        periodAmount.textContent = appData.period;    
    });

});