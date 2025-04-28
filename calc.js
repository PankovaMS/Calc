const monthInput = document.querySelector("#months");
const rateInput = document.querySelector("#rate");
const sumInput = document.querySelector("#sum");

monthInput.addEventListener("beforeinput", (e) => {
  if (!e.data) return;
  
  // Только цифры
  if (e.data < "0" || e.data > "9") {
    e.preventDefault();
    return;
  }

  // Нельзя начинать с 0
  if (e.data === "0" && e.target.value.length === 0) {
    e.preventDefault();
    return;
  }
});

sumInput.addEventListener("beforeinput", (e) => {
  if (!e.data) return;
  
  // Только цифры
  if (e.data < "0" || e.data > "9") {
    e.preventDefault();
    return;
  }

  // Нельзя начинать с 0
  if (e.data === "0" && e.target.value.length === 0) {
    e.preventDefault();
    return;
  }
});

rateInput.addEventListener("beforeinput", (e) => {
  // Если не введен символ - не обрабатывать
  if (!e.data) return;

// если введенный символ не входит в allowed, то запретить ввод
  const allowed = "0123456789,.";
  if (!allowed.includes(e.data)) {
    e.preventDefault();
    return;
  }

  // Нельзя начинать с 0, запятой или точки
  if ((e.data === "0" || e.data === "," || e.data === ".") && e.target.value.length === 0) {
    e.preventDefault();
    return;
  }

  // Блокировать вторую запятую или точку
  if ((e.data === "," && (e.target.value.includes(",") || e.target.value.includes("."))) ||
      (e.data === "." && (e.target.value.includes(",") || e.target.value.includes(".")))) {
    e.preventDefault();
    return;
  }

  // Ограничение: максимум 2 цифры после запятой или точки
  let separatorIndex = e.target.value.indexOf(",");

  if (separatorIndex === -1) {
    separatorIndex = e.target.value.indexOf(".");
  }
  
  // Если разделитель есть, ограничиваем количество символов после него двумя
  if (separatorIndex !== -1) {
    const digitsAfterSeparator = e.target.value.length - separatorIndex - 1;
  
     // Если курсор стоит после запятой или точки
    if (e.target.selectionStart > separatorIndex && digitsAfterSeparator >= 1) {
      e.preventDefault();
      return;
    }
  }
});

// monthInput.addEventListener("beforeinput", (e) => {
//   if (!e.data) return;
//   const char = e.data;
//   const charCode = char.charCodeAt(0);
//   if (char === ' ' || (char < '0' || char > '9')) {
//     e.preventDefault();
//   }

//   if (char === "0" && e.target.value.length === 0) {
//     e.preventDefault();
//   }

//   if (e.target.value.length >= 3 ) {
//     e.preventDefault();
//   }

// });

// rateInput.addEventListener("beforeinput", (e) => {
//   if (!e.data) return;
//   const char = e.data;
//   const charCode = char.charCodeAt(0);
//   if (char === ' ' || ((char < '0' || char > '9') && char !== ',' && char !== '.')) {
//     e.preventDefault();
//   }

//   if (
//     (char === "0" || char === "," || char === ".") &&
//     e.target.value.length === 0
//   ) {
//     e.preventDefault();
//   }

//   if (
//     (char === "," || char === ".") &&
//     (e.target.value.includes(",") || e.target.value.includes("."))
//   ) {
//     e.preventDefault();
//   }

//   if (e.target.value.length >= 5) {
//     e.preventDefault();
//   }

// });

// sumInput.addEventListener("beforeinput", (e) => {
//   if (!e.data) return;
//   const char = e.data;
//   const charCode = char.charCodeAt(0);
//   if (char === ' ' || (char < '0' || char > '9')) {
//     e.preventDefault();
//   }

//   if (char === "0" && e.target.value.length === 0) {
//     e.preventDefault();
//   }

//   if (e.target.value.length >= 8) {
//     e.preventDefault();
//   }

// });

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
    alert("Процентная ставка должна быть от 1.0 до 40.0 %.");
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
