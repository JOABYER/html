const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "EUR") {
            newOption.selected = "Selected";
        } else if (select.name === "to" && currencyCode === "BDT") {
            newOption.selected = "true";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (Element) => {
    let currencyCode = Element.value;
    let counrtyCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${counrtyCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let respons = await fetch(URL);
    let data = await respons.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load", () => {
    updateExchangeRate();
});