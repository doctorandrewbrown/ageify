/* jshint esversion: 11 */

// wait for DOM to load before getting any element. 
document.addEventListener("DOMContentLoaded", () => {

    // grab form element
    const form = document.querySelector("form");

    //  listen for submit event and prevent this to allow form input data to be grabbed. https://www.w3schools.com/jsref/event_preventdefault.asp
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // get user input from form once DOM loaded and submit button clicked
        let inputName = document.querySelector("#firstName").value;
        let inputCountry = document.querySelector("#country").value;

        /* Initiate program by calling function to get data from first api. Pass in callback 
        to call second api only when data successfully received from first */
        getAgeData(getGenderData, inputCountry, inputName);
    });
});

/* function definitions */

/* define function to call agify api, 
 * see https://github.com/Code-Institute-Solutions/WorkingWithExternalResources/blob/master/02-ConsumingAPIsUsingJavaScript/05-callbacks/main.js
 */
function getAgeData(cb, inputCountry, inputName) {

    // declare object to put data from api into
    let apiData = {};

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
            const ageCount = ageData.count;
            apiData.age_count = ageCount;

            // put age data in results object
            apiData = {
                ...apiData,
                ...ageData
            };

            // Invoke callback function getGenderData and pass callback function ie display function

            cb(display, inputCountry, inputName, apiData);
        }
    };
}

// define function to call genderize api
function getGenderData(cb, inputCountry, inputName, apiData) {

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


            // put gender data in results object using spread operator
            apiData = {
                ...apiData,
                ...genderData
            };
            // remove unused count property from results object
            delete apiData.count;

            /* callback function display() to display results on user interface only once data successfully 
            received from second api*/
        
            cb(inputCountry, inputName, apiData);
        }
    };
}

// define function to display results on user interface

function display(inputCountry, inputName, apiData) {

    // create object for getting english names from country codes. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
        type: 'region' 
    });

    // get full country name in english
    const countryName = regionNamesInEnglish.of(apiData.country_id);

    // Set value of country_name in results object
    apiData.country_name = countryName;

    // create list element
    let record = document.createElement("li");

    // add record class and bootstrap classes to record list items in user interface

    record.classList.add("mt-3", "record", "text-center");

    // add click event listener to each list element as created, to remove clicked results, "this" refers to current element
    record.addEventListener("click", function () {
        this.remove();
    });

    // alternative method setting onclick attribute directly on element shown below
    //record.setAttribute("onclick", "this.remove()")

    // check data returned by api for missing gender and age data and provide "no data" message to user
    if (apiData.age === null) {
        apiData.age = "no data";
    }

    if (apiData.gender === null) {
        apiData.gender = "no data";
    }

    // enforce capitalization of results data
    let capitalized_name = apiData.name[0].toUpperCase() + apiData.name.slice(1);

    // set name in results property to capitalized name
    apiData.name = capitalized_name;

    // if no age or gender data returned from api show error message to user
    if (apiData.age === "no data" && apiData.gender === "no data") {

        record.innerHTML = " There is no data available for " + `${apiData.name}` + " in " + `${apiData.country_name};`;
        record.style.color = "red";
    }

    // show result data to user
    else {
        // insert api data in list for display
        record.innerHTML = `name: ${apiData.name}, country: ${apiData.country_name}, average age: ${apiData.age}, (based on ${apiData.age_count} people) gender: ${apiData.gender}, with a probability of ${apiData.probability} (based on ${apiData.gender_count} people).`;
    }

    // append api data to list element in user interface
    const list = document.querySelector("#records");
    list.append(record);
}