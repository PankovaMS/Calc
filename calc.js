function limitInput(selector, regex) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
        if (!regex.test(input.value)) {
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
    });
}

limitInput('#months', /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/);  // до 3 цифр
limitInput('#rate', /^(?:[1-9]|[1-3][0-9]|40)([.,]\d{1,2})?$/);    // до 2 цифр + до 2 после точки
limitInput('#sum', /^(?:[1-9]\d{3,6}|10000000)$/);                           // 4–8 цифр
function calc () {
    const monthInput = document.querySelector('#months');
    const rateInput = document.querySelector('#rate');
    const sumInput = document.querySelector('#sum');

    let month = Number(monthInput.value);
    let rate  = Number(rateInput.value.replace(',', '.'));
    let sum   = Number(sumInput.value);

    // валидация
    if (isNaN(month) || month < 1 || month > 120) {
        alert("Срок вклада должен быть от 1 до 120 месяцев.");
        return;
    }

    if (isNaN(rate) || rate < 1 || rate > 40) {
        alert("Процентная ставка должна быть от 1 до 40 %.");
        return;
    }  

    if (isNaN(sum) || sum < 1000 || sum > 10000000) {
        alert("Сумма вклада должна быть от 1000 до 10000000.");
        return;
    }

    let totalIncome = sum * ((1 + rate / 100 / 12) ** month);
    let monthlyIncome = (totalIncome - sum) / month;

    if (sum >= 1400000) {
        alert('Осторожно: вклад не застрахован государством!');
    }
    console.log(monthlyIncome, totalIncome);

    document.querySelector('#totalIncome').innerHTML = `${totalIncome.toFixed(2)} рублей`;
    document.querySelector('#monthlyIncome').innerHTML = `${monthlyIncome.toFixed(2)} рублей`;
    
}
document.querySelector("button").addEventListener('click', calc);