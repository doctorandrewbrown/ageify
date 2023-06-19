/* jshint esversion: 11 */
// declare variables for user input
let inputName;
let inputCountry;

// declare new empty object to receive api data
let apiData = new Object();

// wait for DOM to load before getting any element
document.addEventListener("DOMContentLoaded", () => {

    // grab form element
    const form = document.querySelector("form");

    //  listen for submit event and prevent this to allow form input data to be grabbed
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // get user input from form once DOM loaded and submit button clicked
        inputName = document.querySelector("#firstName").value;
        inputCountry = document.querySelector("#country").value;

        /* start main program */
        getAgeData(getGenderData);
    });
});

/* function definitions */

// define function to call agify api
function getAgeData(cb) {
    // declare request object
    const xhttp = new XMLHttpRequest();

    // insert user input in api url
    xhttp.open("GET", `https://api.agify.io?name=${inputName}&country_id=${inputCountry}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {

        // check if api data received before updating results
        // this. refers to xhttp object
        if (this.readyState == 4 && this.status == 200) {
            // put api response into json format once data received from api
            let ageData = JSON.parse(this.responseText);
            // rename count data to age_count to prevent overwriting when data from apis is merged
            const ageCount = ageData.count
            apiData.age_count = ageCount
            // put age data in results object
            apiData = {
                ...apiData,
                ...ageData
            }

            // call callback function getGenderData and pass display function
            cb(display);
        };
    };
};

// define function to call genderize api
function getGenderData(cb) {

    // declare request object
    const xhttp = new XMLHttpRequest();

    // insert user input in api url
    xhttp.open("GET", `https://api.genderize.io?name=${inputName}&country_id=${inputCountry}`);
    xhttp.send();

    xhttp.onreadystatechange = function () {

        // check if api data received before updating results

        if (this.readyState == 4 && this.status == 200) {
        
            // put api response into json format
            let genderData = JSON.parse(this.responseText);
            // rename count data to gender_count to prevent overwriting when data from apis is merged
            const genderCount = genderData.count;
            apiData.gender_count = genderCount;

            // put gender data in results object
            apiData = {
                ...apiData,
                ...genderData
            };

            // remove unused count property from results object
            delete apiData.count;

            // callback function display() to display results on user interface
            cb();
        }
    }
}

// define function to display results on user interface

function display() {
    console.log(apiData)
    // create object for getting english names from country codes. See MDN
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
        type: 'region'
    });

    const countryName = regionNamesInEnglish.of(apiData.country_id);

    // Set value of country_name in results object
    apiData.country_name = countryName;

    // create list element
    let record = document.createElement("li");

    // add bootstrap class to li elements for spacing results records in user interface
    // https://stackoverflow.com/questions/74132721/bootstrap-5-center-text-in-li

    record.classList.add("mt-3", "d-flex", "align-items-center");

    // check data returned by api for missing gender and age data and provide "no data" message to user
    if (apiData.age === null){
        apiData.age = "no data";
    };

    if (apiData.gender === null) {
        apiData.gender = "no data";
    };

    // enforce capitalization of results data
    let capitalized_name = apiData.name[0].toUpperCase() + apiData.name.slice(1);

    // set name in results property to capitalized
    apiData.name = capitalized_name;

    // if no age or gender data returned from api show error message to user
    if (apiData.age === "no data" && apiData.gender === "no data") {

        record.innerHTML = " There is no data available for " + `${apiData.name}` + " in " + `${apiData.country_id};`
        record.style.color = "red";
    }
        
    // show result data to user
    else {
        // insert api data in list for display
        record.innerHTML = `name: ${apiData.name}; country: ${apiData.country_name}; average age: ${apiData.age} (based on ${apiData.age_count} people); gender: ${apiData.gender}, with a probability ${apiData.probability} (based on ${apiData.gender_count} people).`;
    };

    // append api data to list in user interface
    const list = document.querySelector("#records");
    list.append(record);
};