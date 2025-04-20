let totalIncome = 0;
let monthlyIncome = 0;

function limitInput(selector, pattern) {
  const input = document.querySelector(selector);

  input.addEventListener('beforeinput', (e) => {
    const newValue =
      input.value.slice(0, input.selectionStart) +
      (e.data ?? '') +
      input.value.slice(input.selectionEnd);

    const testValue = newValue.replace(',', '.');
    if (!testValue.match(pattern)) {
      e.preventDefault(); // блокируем ввод
    }
  });

  input.addEventListener('input', () => {
    input.value = input.value.replace(',', '.'); // заменяем запятую на точку
  });
}

limitInput('#months', /^(?!0)\d{1,3}$/);  // до 3 цифр
limitInput('#rate', /^(?!0)\d{1,2}(\.\d{0,2})?$/);    // до 2 цифр + до 2 после точки
limitInput('#sum', /^(?!0)\d{1,8}$/);                 // 4–8 цифр              // 4–8 цифр
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


    if (sum > 0) {
        totalIncome = sum * ((1 + rate / 100 / 12) ** month);
        monthlyIncome = (totalIncome - sum) / month;
    }
    if (sum >= 1400000) {
        alert('Осторожно: вклад не застрахован государством!');
      }
    console.log(monthlyIncome, totalIncome);

    document.querySelector('#totalIncome').innerHTML = `${totalIncome.toFixed(2)} рублей`;
    document.querySelector('#monthlyIncome').innerHTML = `${monthlyIncome.toFixed(2)} рублей`;
    
}
document.querySelector("button").addEventListener('click', calc);