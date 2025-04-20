let totalIncome = 0;
let monthlyIncome = 0;

function limitInput(selector, pattern) {
  const input = document.querySelector(selector);

  input.addEventListener('beforeinput', (e) => {
    const newValue =
      input.value.slice(0, input.selectionStart) +
      (e.data ?? '') +
      input.value.slice(input.selectionEnd);

    const testValue = newValue.replace(',', '.').replace(/\s+/g, '');
    if (!testValue.match(pattern)) {
      e.preventDefault(); // блокируем ввод
    }
  });

  input.addEventListener('input', () => {
    input.value = input.value.replace(',', '.').replace(/\s+/g, '');
  });
}

limitInput('#months', /^\d{0,3}$/);  // до 3 цифр
limitInput('#rate', /^\d{0,2}(\.\d{0,2})?$/);    // до 2 цифр + до 2 после точки
limitInput('#sum', /^\d{0,8}$/);                 // 4–8 цифр              // 4–8 цифр
function calc () {
    const monthInput = document.querySelector('#months');
    const rateInput = document.querySelector('#rate');
    const sumInput = document.querySelector('#sum');

    let month = Number(monthInput.value);
    let rate  = Number(rateInput.value);
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

    const totalIncome = sum * ((1 + rate / 100 / 12) ** month);
    const monthlyIncome = (totalIncome - sum) / month;

    if (sum >= 1400000) {
        alert('Осторожно: вклад не застрахован государством!');
    }
    console.log(monthlyIncome, totalIncome);

    document.querySelector('#totalIncome').innerHTML = `${totalIncome.toFixed(2)} рублей`;
    document.querySelector('#monthlyIncome').innerHTML = `${monthlyIncome.toFixed(2)} рублей`;
    
}
document.querySelector("button").addEventListener('click', calc);