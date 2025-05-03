const monthInput = document.querySelector("#months");
const rateInput = document.querySelector("#rate");
const sumInput = document.querySelector("#sum");

monthInput.addEventListener("input", (e) => {
  let v = e.target.value
  //замена всего ненужного на пустую строку
  v = v.replace(/[^\d]/g, '');

  // Удаляем ведущие нули
  v = v.replace(/^0+/, '');
  e.target.value = v
});
// заменить всё, что больше 120 на 120
const MAX_MONTH = 120;
const MIN_MONTH = 1;
monthInput.addEventListener('blur', e => {

  let v = Number(e.target.value)

  if (v > MAX_MONTH) {
    e.target.value = MAX_MONTH
  }
  if (v < MIN_MONTH){
    e.target.value = MIN_MONTH
  }
});
rateInput.addEventListener('input', (e) => {
  let v = e.target.value


  v = v.replace(/,/g, '.');

   //замена всего ненужного на пустую строку
   v = v.replace(/[^\d.]/g, '');

  // Удаляем ведущие нули
  v = v.replace(/^0+/, '');
  
  if (v.startsWith('.')) {
    v = "";
  }

   // разделитель
     let parts = v.split('.')
   // не больше 2 символов после разделителя
     if (parts.length >= 2) {
       parts[1] = parts[1].slice(0, 2)
       v = `${parts[0]}.${parts[1]}`
     }
   
     e.target.value = v
});
// заменить всё, что больше 40.0 на 40.0
const MAX_RATE = 40.0;
const MIN_RATE = 1.0;
rateInput.addEventListener('blur', e => {

  let v = Number(e.target.value)

  if (v > MAX_RATE) {
    e.target.value = MAX_RATE
  }
  if (v < MIN_RATE) {
    e.target.value = MIN_RATE
  }
});

sumInput.addEventListener('input', (e) => {
  let v = e.target.value

   //замена всего ненужного на пустую строку
   v = v.replace(/[^\d]/g, '');

  // Удаляем ведущие нули
  v = v.replace(/^0+/, '');
   
     e.target.value = v
});

// заменить всё, что больше 10000000 на 10000000 
const MAX_SUM = 10000000;
const MIN_SUM = 1000;
sumInput.addEventListener('blur', e => {

  let v = Number(e.target.value)

  if (v > MAX_SUM) {
    e.target.value = MAX_SUM
  }
  if (v < MIN_SUM) {
    e.target.value = MIN_SUM
  }
});


// sumInput.addEventListener("input", (e) => {
//   let v = e.target.value
//   //замена , на .
//     v = v.replace(/,/g, '.');
    
//   // Только цифры
//   if (e.data < "0" || e.data > "9") {
//     e.preventDefault();
//     return;
//   }

//   // Нельзя начинать с 0
//   if (e.data === "0" && e.target.value.length === 0) {
//     e.preventDefault();
//     return;
//   }
// });

// rateInput.addEventListener("input", (e) => {
//   // Если не введен символ - не обрабатывать
//   if (!e.data) return;

// // если введенный символ не входит в allowed, то запретить ввод
//   const allowed = "0123456789,.";
//   if (!allowed.includes(e.data)) {
//     e.preventDefault();
//     return;
//   }

//   // Нельзя начинать с 0, запятой или точки
//   if ((e.data === "0" || e.data === "," || e.data === ".") && e.target.value.length === 0) {
//     e.preventDefault();
//     return;
//   }

//   // Блокировать вторую запятую или точку
//   if ((e.data === "," && (e.target.value.includes(",") || e.target.value.includes("."))) ||
//       (e.data === "." && (e.target.value.includes(",") || e.target.value.includes(".")))) {
//     e.preventDefault();
//     return;
//   }

//   // Ограничение: максимум 2 цифры после запятой или точки
//   let separatorIndex = e.target.value.indexOf(",");

//   if (separatorIndex === -1) {
//     separatorIndex = e.target.value.indexOf(".");
//   }
  
//   // Если разделитель есть, ограничиваем количество символов после него двумя
//   if (separatorIndex !== -1) {
//     const digitsAfterSeparator = e.target.value.length - separatorIndex - 1;
  
//      // Если курсор стоит после запятой или точки
//     if (e.target.selectionStart > separatorIndex && digitsAfterSeparator >= 1) {
//       e.preventDefault();
//       return;
//     }
//   }
// });

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
