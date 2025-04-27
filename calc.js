const monthInput = document.querySelector("#months");
const rateInput = document.querySelector("#rate");
const sumInput = document.querySelector("#sum");

monthInput.addEventListener("keypress", (e) => {
  const char = e.key;
  const charCode = char.charCodeAt(0);
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }

  if (char === "0" && e.target.value.length === 0) {
    e.preventDefault();
  }

  if (e.target.value.length >= 3 ) {
    e.preventDefault();
  }

});

rateInput.addEventListener("keypress", (e) => {
  const char = e.key;
  const charCode = char.charCodeAt(0);
  if ((charCode < 48 || charCode > 57) && charCode !== 44 && charCode !== 46) {
    e.preventDefault();
  }

  if (
    (char === "0" || char === "," || char === ".") &&
    e.target.value.length === 0
  ) {
    e.preventDefault();
  }

  if (
    (char === "," || char === ".") &&
    (e.target.value.includes(",") || e.target.value.includes("."))
  ) {
    e.preventDefault();
  }

  if (e.target.value.length >= 5) {
    e.preventDefault();
  }

});

sumInput.addEventListener("keypress", (e) => {
  const char = e.key;
  const charCode = char.charCodeAt(0);
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }

  if (char === "0" && e.target.value.length === 0) {
    e.preventDefault();
  }

  if (e.target.value.length >= 8) {
    e.preventDefault();
  }

});

function calc() {
  let month = Number(monthInput.value);
  let rate = Number(rateInput.value.replace(",", "."));
  let sum = Number(sumInput.value);

  // валидация через alert
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

  let totalIncome = sum * (1 + rate / 100 / 12) ** month;
  let monthlyIncome = (totalIncome - sum) / month;

  if (sum >= 1400000) {
    alert("Осторожно: вклад не застрахован государством!");
  }
  //    console.log(monthlyIncome, totalIncome);

  document.querySelector("#totalIncome").innerHTML = `${totalIncome.toFixed(
    2
  )} рублей`;
  document.querySelector("#monthlyIncome").innerHTML = `${monthlyIncome.toFixed(
    2
  )} рублей`;
}
function reset() {
  monthInput.value = '';
  rateInput.value = '';
  sumInput.value = '';

  document.querySelector('#totalIncome').innerHTML = '';
  document.querySelector('#monthlyIncome').innerHTML = '';
}

document.querySelector("#calc").addEventListener("click", calc);
document.querySelector("#reset").addEventListener("click", reset);
