
// wait for DOM to load before getting any element
document.addEventListener("DOMContentLoaded", () => {

    // grab form element
    const form = document.querySelector("form")

    // explicitly listen for submit event and prevent this to allow form input data to be grabbed
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        // get user input from form
        const inputName = document.querySelector("#inputName").value
        const inputCountry = document.querySelector("#inputCountry").value

        // define function to make api call
        function agify() {

            // insert user input into url call
            const url = `https://api.agify.io?name=${inputName}&country_id=${inputCountry}`
        
            // make api call see 
            // https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
        
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
        
                    // log response object to console to test functionality
                    console.log(data)
                })
        }
        agify()
    })
})

