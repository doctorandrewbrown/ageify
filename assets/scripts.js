let inputName
let inputCountry
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

        // declare empty object for data returned by api
        //let apiData

        // define function to call genderize api

        function genderize() {

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
                // results data only logged after api data received
                .then(() => {
                    // log combined data object

                    console.log(apiData)

                    // create list element
                    const record = document.createElement("li")

                    // insert api data in list for display
                    record.innerHTML = `name: ${apiData.name}, age: ${apiData.age}, gender: ${apiData.gender}, country: ${apiData.country_id}.`

                    // append api data to list in user interface
                    const list = document.querySelector("#records")
                    list.append(record)
                })
        }
        // call functions
        agify()
        genderize()
    })
})

// define function to call ageify apifunction test_warning(){
function agify() {

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

            // log response object to console to test functionality
            console.log("ageify")

            console.log(apiData)
        })
}

