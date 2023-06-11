// declare variables globally

let inputName
let inputCountry

// empty object to receive api data
let apiData

// wait for DOM to load before getting any element
document.addEventListener("DOMContentLoaded", () => {
    // grab form element
    const form = document.querySelector("form")

    // explicitly listen for submit event and prevent this to allow form input data to be grabbed
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        // get user input from form once DOM loaded
        inputName = document.querySelector("#firstName").value
        inputCountry = document.querySelector("#country").value

        getAgeData(display);
    })
})

// define function to call agify api
function getAgeData(cb) {

    // declare request object
    var xhttp = new XMLHttpRequest();

    // insert user input in api url
    xhttp.open("GET", `https://api.agify.io?name=${inputName}&country_id=${inputCountry}`);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        console.log(this.readyState)

        // check if api data received
        if (this.readyState == 4 && this.status == 200) {

            // put api response into json format
            let ageData = JSON.parse(this.responseText)

            // update results object
            apiData = {
                ...apiData,
                ...ageData
            }

            // call callback function
            cb();
        }
    };
}

// define function to display results on user interface

function display(){
    console.log("display")
    // log combined data object
    console.log(apiData)

    // create list element
    const record = document.createElement("li")

    // insert api data in list for display
    record.innerHTML = `name: ${apiData.name}, age: ${apiData.age}, count: ${apiData.count}, country: ${apiData.country_id}.`

    // append api data to list in user interface
    const list = document.querySelector("#records")
    list.append(record)
}






/*/ define function to call ageify api

function agify() {
    console.log("ageify")
    // insert user input into url call
    const url = `https://api.agify.io?name=${inputName}&country_id=${inputCountry}`
    console.log(inputName)

    // make api call see 
    // https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let ageData = data

            // put api age data response into apiData object using spread operator

            apiData = {
                ...apiData,
                ...ageData
            }
            console.log(apiData)
            display()
        })
        //.then(display())
}
// define function to call genderize api

/*function genderize() {

    // insert user input into url call
    const url = `https://api.genderize.io?name=${inputName}&country_id=${inputCountry}`
    console.log(inputName)

    // make api call see 
    // https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let genderData = data

            // put api gender data response into apiData object using spread operator

            apiData = {
                ...apiData,
                ...genderData
            }

            // log response object to console to test functionality

            console.log("genderize")
            console.log(apiData)

        })
}*/
