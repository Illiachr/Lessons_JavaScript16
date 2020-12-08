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

    const AppData = function () {
        this.budget          = 0;
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
    }; 

    AppData.prototype.check = function() {
        if (salaryAmount.value !== '') {
            startBtn.setAttribute('disabled', 'false');
        }
    };

    AppData.prototype.start = function() {
        if (salaryAmount.value === '') {
            startBtn.setAttribute('disabled', 'true');
            return;
        }

        document.querySelectorAll('.data input[type="text"]').forEach(
            item => item.setAttribute('disabled', 'true')
        );
        incomeAdd.setAttribute('disabled', 'true');
        expensesAdd.setAttribute('disabled', 'true');
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';

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
    };

    AppData.prototype.showResult = function() {
        budgetMonthValue.value = this.budget;
        budgetDayValue.value = Math.floor(this.budgetDay);
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
    };

    AppData.prototype.addExpensesBlock = function () { 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let cloneChildNodes = cloneExpensesItem.childNodes;
        cloneChildNodes[1].value = '';
        cloneChildNodes[3].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

        if(document.querySelectorAll('.expenses-items').length === 3) {
            expensesAdd.style.display = 'none';
        }
    }; 

    AppData.prototype.addIncomeBlock = function () {
        let cloneItem = incomeItems[0].cloneNode(true);
        let cloneChildNodes = cloneItem.childNodes;
        cloneChildNodes[1].value = '';
        cloneChildNodes[3].value = '';
        incomeItems[0].parentNode.insertBefore(cloneItem,incomeAdd);

        if(document.querySelectorAll('.income-items').length === 3) {
            incomeAdd.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function () {
        document.querySelectorAll('.expenses-items').forEach( item => {
            let itemExpenses = item.querySelector('.expenses-title').value.toLowerCase();
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                this.Expenses[itemExpenses] = parseFloat(cashExpenses);
            }
        });
    };

    AppData.prototype.getIncome = function () {
        document.querySelectorAll('.income-items').forEach( item => {
            let itemIncome = item.querySelector('.income-title').value.toLowerCase();
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                this.income[itemIncome] = parseFloat(cashIncome);
                this.incomeMonth += +this.income[itemIncome];
            }
        });
    };

    AppData.prototype.getAddExpenses = function () {
        let addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item.toLowerCase());
            }
        });
    };

    AppData.prototype.getAddIncome = function () {
        additionalIncome.forEach((item) => {
            let itemValue = item.value.trim().toLowerCase();
            this.addIncome.push(itemValue);
        });
    };

    AppData.prototype.getExpensesMonth= function () {
        for (let key in this.Expenses) {                    
            this.expensesMonth +=  +this.Expenses[key];
        }  
    };
    
    AppData.prototype.getBudget= function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    };
    
    AppData.prototype.getTargetMonth= function () {                
        return targetAmount.value/this.budgetMonth;
    };
    
    AppData.prototype.getStatusIncome = function  () {
        return this.budgetDay >= 1200 ? 'У Вас высокий уровень дохода' :
            this.budgetDay > 600 && this.budgetDay < 1200 ? 'У Вас средний уровень дохода' :
            this.budgetDay > 0 && this.budgetDay <= 600 ? 
            'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
    };
// TODO предложение ввода данных по депозиту и предупреждение о пустых полях
    AppData.prototype.getInfoDeposit = function  () {
        if (this.deposit && depositAmount.value.trim() !== '' && depositPercent.value)
        {
            this.depositSum = +depositAmount.value;
            this.depositPercent = +depositPercent.value;
            console.log(this);
        }                
    };

    AppData.prototype.calcPeriod= function () {
        return this.budgetMonth*periodSelect.value;
    };


    AppData.prototype.reset = function () {

        let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
            
            inputTextData.forEach(elem => {
                elem.value = '';
                elem.removeAttribute('disabled');
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value; 
            });
            resultInputAll.forEach(elem => {
                elem.value = '';
            });
        
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.remonveChild(expensesItems[i]);
            incomeAdd.style.display = 'block';
        }
        
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.remonveChild(expensesItems[i]);
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
        depositAmount.removeAttribute('disabled');
        depositPercent.removeAttribute('disabled');
        };

    const appData = new AppData();

    console.log(appData);

    // const reset = () => {
    //     const defaults = {
    //         '[object Object]': {},
    //         '[object Array]': [],
    //         '[object String]': '',
    //         '[object Boolean]': false,
    //         '[object Number]': 0
    //     };        
    //     for (let key in appData){
    //         if (appData.hasOwnProperty(key)) {
    //             if (key === 'start') { break; }
    //                 appData[key] = defaults[Object.prototype.toString.call(appData[key])];
    //         }
    //     }
    //     document.querySelectorAll('.data input[type="text"]').forEach(
    //         item => item.disabled = false
    //     );
    //     document.querySelectorAll('.calc input[type="text"]').forEach(
    //         item => item.value = ''
    //     );
    //     periodSelect.value = 1;
    //     depositCheck.checked = false;
    //     depositBank.style.display = 'none';
    //     depositAmount.style.display = 'none';
    //     depositPercent.style.display = 'none'; 
    //     cancelBtn.style.display = 'none';
    //     startBtn.style.display = 'block';
    //     console.log(appData);
    // };

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
        appData.start();
    });

    salaryAmount.addEventListener('click', () => {
        startBtn.disabled = false;
    });

    cancelBtn.addEventListener('click', () => {
        //TODO reset();
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