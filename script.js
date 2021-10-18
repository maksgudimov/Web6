function proiz() {
    var num1, num2, rezult;
    num1 = document.getElementById('n1').value;
    num1 = parseInt(num1);// 5 - нормально, 5ф - не нормально, преобразует в 5 
    num2 = document.getElementById('n2').value;
    num2 = parseInt(num2);
    var reg = /[A-Za-zА-Яа-яЁё]/g;
    if (reg.test(num1) || reg.test(num2) || num1 < 0 || num2 < 0) {
        alert('Вводить можно только положительные числа числа!');
    }
    if (num1 == 0 || num2 == 0) {
        alert('Введите значения!');
    }
    rezult = num1 * num2;
    if (rezult <= 0) {
        alert('Ошибка! Результат не может иметь отрицательное значение или 0');
        let str = "Ошибка!";
        document.getElementById('out').innerHTML = str;
    }
    //innerHTML
    else {
        document.getElementById('out').innerHTML = rezult;
    }
}
function updatePrice()
{
    var vvod = 1; 
    // vvod = document.getElementById('m1').value;

    // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex] * vvod;
  }
  
  // Скрываем или показываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "3" ? "block" : "none");


  
  // Смотрим какая товарная опция выбрана.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  // Скрываем или показываем чекбоксы.
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "3" ? "none" : "block");
  checkDiv.style.display = (select.value == "1" ? "none" : "block");

  // Смотрим какие товарные свойства выбраны.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });
  let prodPrice = document.getElementById("prodPrice");
  prodPrice.innerHTML = price  + " рублей";
}

function getPrices() {
    var vvod2 = document.getElementById('m1').value;
  return {
    prodTypes: [100, 200, 150],
    prodOptions: {
      option2: 10,
      option3: 5,
    },
    prodProperties: {
      prop1: 1,
      prop2: 2,
    }
  };
}
 function onInput(el){
     return el.value;
 }

window.addEventListener('DOMContentLoaded', function (proiz) {
    console.log("DOM fully loaded and parsed");
    let b = document.getElementById("result-btn");
    b.addEventListener("click", proiz);
});

window.addEventListener('DOMContentLoaded', function (event) {
  // Скрываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";
  
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик на изменение select.
  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  
  // Назначаем обработчик радиокнопок.  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

    // Назначаем обработчик радиокнопок.  
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  updatePrice();
});