let currencyInputs = document.querySelectorAll('.currency');

let currInput = document.querySelector('.curr-from');
let currTarget = document.querySelector('.curr-to');

currencyInputs.forEach(function (input) {
    input.addEventListener('keyup', function (e) {
        if (e.target.classList.contains('curr-in')) {
            convertCurrency(e.target.value, document.querySelector('.curr-out'), currInput, currTarget);
        } else {
            convertCurrency(e.target.value, document.querySelector('.curr-in'), currTarget, currInput);
        }
    });
});


const fetchPromise = fetch('https://api.currencyfreaks.com/latest?apikey=0aeaec418bfc4d7794913381d602ac3a').then(response => response.json());


function convertCurrency(amount, output, source, dest) {
    fetchPromise.then((curr) => {
        let input = curr.rates[source.value];
        let target = curr.rates[dest.value];
        let rate = target / input;
        output.value = parseFloat(amount) * rate;
    });
}

let currName = document.querySelectorAll('.curr-form');

currName.forEach(function (curForm) {
    updateRates(curForm);
});


function updateRates(curForm) {
    curForm.addEventListener('change', function (e) {
        if (e.target.classList.contains('curr-from')) {
            convertCurrency(document.querySelector('.curr-in').value, document.querySelector('.curr-out'), currInput, currTarget);
        } else {
            convertCurrency(document.querySelector('.curr-out').value, document.querySelector('.curr-in'), currTarget, currInput);
        }
        updateTexts();
    });
}

function updateTexts() {
    let convRate = document.querySelector('.rate .number');
    fetchPromise.then((curr) => {
        let input = curr.rates[currInput.value];
        let target = curr.rates[currTarget.value];
        let rate = target / input;
        convRate.innerHTML = rate.toFixed(2);
    });
    let currSrc = document.querySelector('.source .src');
    currSrc.innerHTML = currInput.options[currInput.selectedIndex].text;
    let currTrgt = document.querySelector('.rate .trgt');
    currTrgt.innerHTML = currTarget.options[currTarget.selectedIndex].text;
}

setTimeout(updateTexts, 100);