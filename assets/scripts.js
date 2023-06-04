// wait for DOM to load before getting any element
document.addEventListener("DOMContentLoaded", ()=>{

    // grab form element
    const form = document.querySelector("form")

    // listen for submit event on form and prevent this allowing user input to be grabbed
    form.addEventListener("submit", (event)=> {
        event.preventDefault()
        const name = document.querySelector("#name").value
        
        // log to console to test functionality
        console.log(name)
    })
})