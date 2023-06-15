// declare variables for user input
let inputName
let inputCountry

// declare empty object to receive api data
let apiData

// wait for DOM to load before getting any element
document.addEventListener("DOMContentLoaded", () => {

    // grab form element
    const form = document.querySelector("form")

    //  listen for submit event and prevent this to allow form input data to be grabbed
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        // get user input from form once DOM loaded and submit button clicked
        inputName = document.querySelector("#firstName").value
        inputCountry = document.querySelector("#country").value

        /* start main program */
        getAgeData(() => getGenderData(display))
    })
})

/* function definitions */

// define function to call agify api
function getAgeData(cb) {
    console.log("getAgeData")
    // declare request object
    const xhttp = new XMLHttpRequest();

    // insert user input in api url
    xhttp.open("GET", `https://api.agify.io?name=${inputName}&country_id=${inputCountry}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        // check if api data received before updating results
        // this. refers to xhttp object
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.status)
            // put api response into json format once data received from api
            let ageData = JSON.parse(this.responseText)

            // put age data in results object
            apiData = {
                ...apiData,
                ...ageData
            }

            // call callback function
            cb()
        }
    };
}

// define function to call genderize api
function getGenderData(cb) {
    console.log("getGenderData")
    // declare request object
    const xhttp = new XMLHttpRequest();

    // insert user input in api url
    xhttp.open("GET", `https://api.genderize.io?name=${inputName}&country_id=${inputCountry}`);
    xhttp.send();

    xhttp.onreadystatechange = function () {

        // check if api data received before updating results

        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.status)
            // put api response into json format
            let genderData = JSON.parse(this.responseText)

            // put gender data in results object
            apiData = {
                ...apiData,
                ...genderData
            }

            // call callback function to display results on user interface
            cb()
        }
    }
}

// define function to display results on user interface

function display() {

    // creates object for getting english names from country codes
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    const countryName = regionNamesInEnglish.of(apiData.country_id)
    
    // create list element
    const record = document.createElement("li")

    // insert api data in list for display
    record.innerHTML = `name: ${apiData.name}, age: ${apiData.age}, gender: ${apiData.gender}, 
    probability: ${apiData.probability}, count: ${apiData.count}, country: ${countryName}.<br>`

    // append api data to list in user interface
    const list = document.querySelector("#records")
    list.append(record)
}