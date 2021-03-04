var register = document.querySelector(".register"),
    registerBtn = document.querySelector(".register-header"),
    textBody = document.querySelector(".text-body"),
    mobileHero = document.querySelector(".mobile-hero"),
    mobileBottom = document.querySelector(".mobile-bottom");
registerBtn.addEventListener("click", () => { register.classList.contains("active") || (textBody.classList.add("fade"), mobileHero.classList.add("fade"), setTimeout(() => { mobileBottom.classList.add("hide"), mobileHero.classList.add("hide"), textBody.classList.add("remove"), register.classList.add("active") }, 0)), register.classList.contains("active") && (register.classList.remove("active"), setTimeout(() => { textBody.classList.remove("remove"), mobileBottom.classList.remove("hide"), mobileHero.classList.remove("fade"), setTimeout(() => { textBody.classList.remove("fade"), mobileHero.classList.remove("hide") }, 10) }, 350)) });


/* Current URL */
var url = document.getElementById("remarketing");
url.value = window.location.href;


/* Popup */

var popupOpen = document.getElementById("popup-btn_open");
var popupClose = document.getElementById("popup-btn_close");
var popup = document.getElementById("popup");

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);

function openPopup() {
    popup.style.opacity = "1";
    popup.style.visibility = "visible";
}

function closePopup() {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
}


/* Form */

const submitButton = document.getElementById("submit-btn");
const submitResponse = document.getElementById("submit-response");

function buildJsonFormData(form) {
    const jsonFormData = {};
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
};

const enquriyForm = document.querySelector("#form-form");

if (enquriyForm) {
    enquriyForm.addEventListener("submit", function(e) {
        submitForm(e, this);
        setTimeout(function() {
            submitButton.style.visibility = "hidden";
            submitButton.style.opacity = "0";
            submitButton.style.display = "none";
            submitResponse.style.visibility = "visible";
            submitResponse.style.opacity = "1";
            submitResponse.style.maxHeight = "min-content";
        }, 1000);
    });
};

function submitForm(e, form) {
    e.preventDefault();
    const jsonFormData = buildJsonFormData(form);
    $.ajax({
        url: "form.php",
        method: "POST",
        crossDomain: true,
        data: jsonFormData,
        dataType: "json",
    });
};


/* Multi Select */

var maxPrice = document.querySelector('#maxPrice');
var minPrice = document.querySelector('#minPrice');
var minPriceOp = minPrice.querySelectorAll('option');

function giveSelectionPrice(priceValue) {
    minPrice.innerHTML = '';
    for (var i = 0; i < minPriceOp.length; i++) {
        if (minPriceOp[i].dataset.option === priceValue) {
            minPrice.appendChild(minPriceOp[i]);
        }
    }
}
giveSelectionPrice(maxPrice.value);

var maxBed = document.querySelector('#maxBed');
var minBed = document.querySelector('#minBed');
var minBedOp = minBed.querySelectorAll('option');

function giveSelectionBed(bedValue) {
    minBed.innerHTML = '';
    for (var i = 0; i < minBedOp.length; i++) {
        if (minBedOp[i].dataset.option === bedValue) {
            minBed.appendChild(minBedOp[i]);
        }
    }
}
giveSelectionBed(maxBed.value);


/* Pull Suburbs */

const searchSub = document.getElementById("form-search_suburb");
const listSub = document.getElementById("form-list_suburb");


const searchSuburbs = async searchText => {
    const res = await fetch('assets/data/suburb.json');
    const suburbs = await res.json();

    let matches = suburbs.filter(suburb => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return suburb.value.match(regex) || suburb.value.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        listSub.innerHTML = '';
    }
    outputHtmlSub(matches);
};

const outputHtmlSub = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <button type="button" class="form-control form-search_btn" value="${match.value}" onclick="autoCompleteSub(this.value)">
                <p>${match.value}</p>
            </button>
        `).join('');
        listSub.innerHTML = html;
    }
}

searchSub.addEventListener('input', () => searchSuburbs(searchSub.value));

function autoCompleteSub(curVal) {
    searchSub.value = curVal;
    matches = [];
    listSub.innerHTML = '';
}


/* Pull Cities */

const searchCit = document.getElementById("form-search_city");
const listCit = document.getElementById("form-list_city");


const searchCities = async searchText => {
    const res = await fetch('assets/data/city.json');
    const suburbs = await res.json();

    let matches = suburbs.filter(suburb => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return suburb.value.match(regex) || suburb.value.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        listCit.innerHTML = '';
    }
    outputHtmlCit(matches);
};

const outputHtmlCit = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <button type="button" class="form-control form-search_btn" value="${match.value}" onclick="autoCompleteCit(this.value)">
                <p>${match.value}</p>
            </button>
        `).join('');
        listCit.innerHTML = html;
    }
}

searchCit.addEventListener('input', () => searchCities(searchCit.value));

function autoCompleteCit(curVal) {
    searchCit.value = curVal;
    matches = [];
    listCit.innerHTML = '';
}