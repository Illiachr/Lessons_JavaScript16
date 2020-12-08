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
//TODO DELETE isNumber
    const isNumber = (x) => {
        return !isNaN(parseFloat(x)) && isFinite(parseFloat(x));
        };

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
            startBtn.setAttribute('disabled', 'false')
        }
    };

    AppData.prototype.start = function() {
        if (salaryAmount.value === '') {
            startBtn.setAttribute('disabled', 'true');
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

    AppData.prototype.reset = function () {

        let inputTextData ... .data input[type = text],
            resultInputAll ... .result input[type = text];
            
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
        ....
        this.addExpenses = [];
        
        cancel.... none;
        sart... block;
        incomeAdd.removeAttribute('disabled');
        expensesAdd.removeAttribute('disabled');
        chekBox.checked = false;
        }

    const appData = new AppData();

    console.log(appData);

    const reset = () => {
        const defaults = {
            '[object Object]': {},
            '[object Array]': [],
            '[object String]': '',
            '[object Boolean]': false,
            '[object Number]': 0
        };        
        for (let key in appData){
            if (appData.hasOwnProperty(key)) {
                if (key === 'start') { break; }
                    appData[key] = defaults[Object.prototype.toString.call(appData[key])];
            }
        }
        document.querySelectorAll('.data input[type="text"]').forEach(
            item => item.disabled = false
        );
        document.querySelectorAll('.calc input[type="text"]').forEach(
            item => item.value = ''
        );
        periodSelect.value = 1;
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none'; 
        cancelBtn.style.display = 'none';
        startBtn.style.display = 'block';
        console.log(appData);
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
        if(salaryAmount.value === '' || !isNumber(salaryAmount.value)) {
            this.disabled = true;
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        } 
        appData.start();
    });

    salaryAmount.addEventListener('click', () => {
        startBtn.disabled = false;
    });

    cancelBtn.addEventListener('click', () => {
        reset();
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