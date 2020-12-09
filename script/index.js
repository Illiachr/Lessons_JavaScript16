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

    class AppData {
        constructor() {
            this.budget = 0;
            this.income = {};
            this.addIncome = [],
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.depositSum = 0;
            this.depositPercent = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.incomeMonth = 0;
        }
        start() {
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

            this.getTransactions();
            // this.getExpenses();
            // this.getIncome();

            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.getInfoDeposit();
            this.showResult();
        }
        showResult() {
            budgetMonthValue.value = this.budget;
            budgetDayValue.value = Math.floor(this.budgetDay);

            expensesMonthValue.value = this.expensesMonth;
            if (this.addExpenses[0] !== '') {
                addExpensesValue.value = this.addExpenses.map(
                    (item) => item[0].toUpperCase() + item.slice(1)
                ).join(', ');
            }
            addIncomeValue.value = this.addIncome.map(
                    (item) => {
                        return item !== '' ?
                            item[0].toUpperCase() + item.slice(1) : ''; 
                    }
                ).join(', ');

            periodValue.value = this.calcPeriod();
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            periodSelect.addEventListener('change', () => {
                this.period = periodSelect.value;
                periodValue.value = this.calcPeriod();
            });

            console.log(this);
        }        

        addBlock(selector) {         
            const plusBtn = document.querySelector(`${selector} button`),
                cloneItem = document.querySelectorAll(`${selector}-items`)[0].cloneNode(true);                    
            cloneItem.childNodes[1].value = '';
            cloneItem.childNodes[3].value = '';
            document.querySelectorAll(`${selector}-items`)[0].parentNode.insertBefore(cloneItem, plusBtn);
    
            if (document.querySelectorAll(`${selector}-items`).length === 3) {
                plusBtn.style.display = 'none';
            }
        }

        getTransactions () {
            const count = (item) => {
                const selectorItem = item.className.split('-')[0],
                    itemTitle = item.querySelector(`.${selectorItem}-title`).value.toLowerCase(),
                    itemAmount = item.querySelector(`.${selectorItem}-amount`).value;
                if (itemTitle.trim() !== '' && itemAmount.trim() !== '') {
                    this[selectorItem][itemTitle] = parseFloat(itemAmount);                    
                }
            };

            document.querySelectorAll('.expenses-items').forEach(count);
            document.querySelectorAll('.income-items').forEach(count);
            for (let key in this.income) {
                this.incomeMonth += this.income[key];
            }
        }

        getAddExpenses() {
            const addExpenses = additionalExpenses.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item.toLowerCase());
                }
            });
        }
        getAddIncome() {
            additionalIncome.forEach((item) => {
                const itemValue = item.value.trim().toLowerCase();
                this.addIncome.push(itemValue);
            });
        }
        getExpensesMonth() {
            for (const key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget() {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
        getTargetMonth() {
            return targetAmount.value / this.budgetMonth;
        }
        getStatusIncome() {
            return this.budgetDay >= 1200 ? 'У Вас высокий уровень дохода' :
                this.budgetDay > 600 && this.budgetDay < 1200 ? 'У Вас средний уровень дохода' :
                    this.budgetDay > 0 && this.budgetDay <= 600 ?
                        'К сожалению у Вас уровень дохода ниже среднего' : 'Что-то пошло не так!';
        }
        // TODO предложение ввода данных по депозиту и предупреждение о пустых полях
        getInfoDeposit() {
            if (this.deposit && depositAmount.value.trim() !== '' && depositPercent.value) {
                this.depositSum = +depositAmount.value;
                this.depositPercent = +depositPercent.value;
                console.log(this);
            }
        }
        calcPeriod() {
            return this.budgetMonth * periodSelect.value;
        }
        reset() {

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
            this.income = {};
            this.addIncome = [],
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.depositSum = 0;
            this.depositPercent = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.incomeMonth = 0;

            cancelBtn.style.display = 'none';
            startBtn.style.display = 'block';
            incomeAdd.removeAttribute('disabled');
            expensesAdd.removeAttribute('disabled');
            depositCheck.checked = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
        }
        validateInput() {
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
        }
        eventsListeners() {
            startBtn.addEventListener('click', event => {
                this.start();
            });

            salaryAmount.addEventListener('click', () => {
                startBtn.disabled = false;
            });

            cancelBtn.addEventListener('click', () => {
                this.reset();
            });

            expensesAdd.addEventListener('click', () => {
                this.addBlock('.expenses');
                this.validateInput();
            });


            incomeAdd.addEventListener('click', () => {
                this.addBlock('.income');
                this.validateInput();
            });

            document.querySelector('.deposit-label').addEventListener('click', () => {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                this.deposit = false;

                if (depositCheck.checked) {
                    depositBank.style.display = 'block';
                    depositAmount.style.display = 'inline';
                    depositPercent.style.display = 'inline';
                    this.deposit = true;
                }
            });

            periodSelect.addEventListener('input', () => {
                this.period = periodSelect.value;
                periodAmount.textContent = this.period;
            });
        }
    } 

    const appData = new AppData();

    appData.validateInput();
    appData.eventsListeners();
    console.log(appData);
});