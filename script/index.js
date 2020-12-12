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
        depositLabel = document.querySelector('.deposit-label');

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
            this.keyLS = 'dbCalc';
        }
        start() {
            if (salaryAmount.value === '') {
                startBtn.setAttribute('disabled', 'true');
                alert('Поле "Месячный доход" должно быть заполнено!');
                return;
            }           

            this.budget = +salaryAmount.value;

            this.getTransactions();
            this.getExpensesMonth();
            this.getAdditional();
            this.getInfoDeposit();
            this.getBudget();
            
            this.showResult();
            this.setFormLock();           
            this.storToLS();
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
        getAdditional () {                        
            const count = (item, key) => {                
                if (item.trim() !== '') {
                    this[key].push(item.trim().toLowerCase());
                }
            };
            additionalIncome.forEach(item => count(item.value, 'addIncome'));
            additionalExpenses.value.split(',').forEach(item => count(item, 'addExpenses'));
        }

        getExpensesMonth() {
            for (const key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget() {
            const depIncomeMth = this.deposit ? this.depositSum * (this.depositPercent/100) : 0;
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + depIncomeMth;
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
        getInfoDeposit() {
            if (this.deposit) {                
                this.depositSum = +depositAmount.value;
                this.depositPercent = depositBank.value === 'other'? +depositPercent.value :
                                    +depositBank.value;
                console.log(this);
            }
        }

        changePercent() {
            if(depositBank.value === 'other') {
                depositPercent.style.display = 'inline';
                this.depositPercent = +depositPercent.value;
            } else { depositPercent.style.display = 'none';
                    this.depositPercent = +depositBank.value;
                    if (startBtn.disabled) { startBtn.disabled = false; }
                }
        }

        depositHandler() {
            depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                depositAmount.value = '';
                depositPercent.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', () => {
                    this.changePercent();
                });
                startBtn.disabled = false;

                if (depositCheck.checked) {
                    startBtn.disabled = true;
                    depositBank.style.display = 'inline';
                    depositAmount.style.display = 'inline';
                    this.deposit = true;
                    depositBank.addEventListener('change', () => {
                        this.changePercent();
                    });
                }
        }

        calcPeriod() {
            return Math.floor(this.budgetMonth * periodSelect.value);
        }

        setCookie(name, value, options = {}) {
            options = {
                path: '/',
                ...options
            };
        
            if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
            }
        
            let updatedCookie = `${encodeURIComponent(name)} = ${encodeURIComponent(value)}`;
        
            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }
            document.cookie = updatedCookie;
        }

        getDataLS() {
            return localStorage.getItem(this.keyLS) !== null ?
                new Map (Object.entries(JSON.parse(localStorage.getItem(this.keyLS)))) :
                false;
        }

        getCookies() {
            return document.cookie !== '' ? 
                new Map ([...document.cookie.split(";").map(item => 
                    decodeURIComponent(item).trim().split('='))]) :
                false;
        }
        

        deleteCookie(name) {
            this.setCookie(name, "", {
            'max-age': -1
            });
        }

        setFormLock () {
            document.querySelectorAll('.data input[type="text"]').forEach(
                item => item.setAttribute('disabled', 'true')
            );
            incomeAdd.setAttribute('disabled', 'true');
            expensesAdd.setAttribute('disabled', 'true');
            startBtn.style.display = 'none';
            cancelBtn.style.display = 'inline';
        }

        loadData(){            
            const dbCalcMap = this.getDataLS(),
                dbCookiesMap = this.getCookies();
                if (dbCalcMap !== false && dbCookiesMap !== false) {
                    for(const [key, value] of dbCalcMap) {
                        if (dbCookiesMap.has(key) && dbCookiesMap.get(key) === value) {
                            document.querySelector(`.${key}`).value = value;                        
                        } else { return this.reset(); }
                    }
                    this.setFormLock();
                }                
                        
        }

        storToLS() {
            const resultInputAll = document.querySelectorAll('.result input[type = text]');
            let storeData = {};
            resultInputAll.forEach((item) => storeData[item.className.split(' ')[1]] = item.value);
            for(let key in storeData){
                this.setCookie(key, storeData[key], {'max-age': 720000});
            }
            this.setCookie('isLoad', true, {'max-age': 720000});
            localStorage.dbCalc = JSON.stringify(storeData);

        }

        reset() {
            const inputTextData = document.querySelectorAll('.data input[type = text]'),
                resultInputAll = document.querySelectorAll('.result input[type = text]'),
                incItms = document.querySelectorAll('.expenses-items'),
                expItms = document.querySelectorAll('.income-items');            
            resultInputAll.forEach((item) => this.deleteCookie(item.className.split(' ')[1]));
            this.deleteCookie('isLoad');
            localStorage.removeItem('dbCalc');
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
            const inputText = document.querySelectorAll('.data input[placeholder=Наименование]'),
                inputNum = [
                ...document.querySelectorAll('.data input[placeholder=Сумма]'),
                ...document.querySelectorAll('.data input[placeholder=Процент]')
            ];

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
            startBtn.addEventListener('click', () => {
                this.start();
            });

            salaryAmount.addEventListener('click', () => {
                startBtn.disabled = false;
            });

            depositPercent.addEventListener('blur', () => {
                if (depositPercent.value > 0 && depositPercent.value < 100 || 
                    depositBank.value !== 'other' ||
                    !depositCheck.checked) {
                    startBtn.disabled = false;
                } else {
                    alert('Введите корректное значение в поле проценты');
                    startBtn.disabled = true;
                }
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

            document.querySelector('.deposit-label').addEventListener('change', () => {
                this.depositHandler();
            });

            periodSelect.addEventListener('input', () => {
                this.period = periodSelect.value;
                periodAmount.textContent = this.period;
            });
        }
    } 

    const appData = new AppData();

    appData.validateInput();    
    appData.loadData();

    appData.eventsListeners();
    console.log(appData);
});