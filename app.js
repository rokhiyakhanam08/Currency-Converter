const exchangeRates = {
  USD: { INR: 83.2, EUR: 0.92, GBP: 0.79, JPY: 157.3, AUD: 1.51, CAD: 1.36, CNY: 7.25 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.89, AUD: 0.018, CAD: 0.016, CNY: 0.087 },
  EUR: { USD: 1.09, INR: 90.2, GBP: 0.86, JPY: 170.1, AUD: 1.64, CAD: 1.47, CNY: 7.85 },
  GBP: { USD: 1.27, INR: 105.4, EUR: 1.16, JPY: 198.7, AUD: 1.90, CAD: 1.71, CNY: 9.12 },
  JPY: { USD: 0.0064, INR: 0.53, EUR: 0.0058, GBP: 0.005, AUD: 0.0096, CAD: 0.0086, CNY: 0.046 },
  AUD: { USD: 0.66, INR: 55.1, EUR: 0.61, GBP: 0.53, JPY: 104.4, CAD: 0.90, CNY: 4.79 },
  CAD: { USD: 0.74, INR: 61.2, EUR: 0.68, GBP: 0.58, JPY: 116.4, AUD: 1.11, CNY: 5.31 },
  CNY: { USD: 0.14, INR: 11.5, EUR: 0.13, GBP: 0.11, JPY: 21.9, AUD: 0.21, CAD: 0.19 },
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

function updateExchangeRate() {
  let amtInput = document.querySelector(".amount input");
  let amtVal = parseFloat(amtInput.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amtInput.value = 1;
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const rate = exchangeRates[from]?.[to];

  if (rate) {
    const converted = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${from} = ${converted} ${to}`;
  } else {
    msg.innerText = "Exchange rate not available.";
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => updateExchangeRate());
