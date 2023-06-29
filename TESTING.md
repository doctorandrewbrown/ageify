# Testing

Return back to the [README.md](README.md) file.

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Page | W3C URL | Screenshot | |
| --- | --- | --- | --- |
| Home | [W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdoctorandrewbrown.github.io%2Fageify%2F) | ![screenshot](documentation/html-checker-result.png) | 


### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| File | Jigsaw URL | Screenshot | |
| --- | --- | --- | --- |
| style.css | [Jigsaw](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdoctorandrewbrown.github.io%2Fageify%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) |![screenshot](documentation/css-validation.png)|
### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.


| File | Screenshot | Notes |
| --- | --- | --- |
| scripts.js | ![screenshot](documentation/jshint-errors.png) | Missing () from new object constructor and missing semicolons |
 

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Screenshot | Notes |
| --- | --- | --- |
| Chrome | ![screenshot](documentation/chrome.png) | Works as expected |
| Firefox | ![screenshot](documentation/firefox.png) | Works as expected |
| Opera | ![screenshot](documentation/opera.png) | Works as expected |

  
## Responsiveness


I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Screenshot | Notes |
| --- | --- | --- |
| Mobile (DevTools) | ![screenshot](documentation/responsive-mobile.png) | Works as expected |
| Tablet (DevTools) | ![screenshot](documentation/responsive-tablet.png) | Works as expected |
| Laptop | ![screenshot](documentation/responsive-laptop.png) | Works as expected. |
| Samsung Galaxy mobile phone (real device) | ![screenshot](documentation/responsive-galaxy.jpg) | Works as expected |
| Samsung Galaxy mobile phone (real device) | ![screenshot](documentation/responsive-menu.jpg) | Works as expected |
## Lighthouse Audit



I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | Mobile | ![screenshot](documentation/lighthouse-mobile.png) | Some minor warnings |
| Home | Desktop | ![screenshot](documentation/lighthouse-desktop.png) | Some minor warnings |

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page | User Action | Expected Result | Pass/Fail | Screenshot |Comments|
| --- | --- | --- | --- | --- |---|
| Home Page | | | | |
| | Click submit without filling required "name" form field | Inform user field is required | Pass | ![screenshot](documentation/form-defence0.png)|The screenshot shows the "tip" informing user field is required|
| | Click submit without selecting county form field | country field takes a default value of "United Kingdom" and query proceeds| Pass | ![screenshot](documentation/form-defence1.png)|The screenshot shows default value of "United Kingdom" taken where user fails to make an active selection from dropdown|
| | Submit non existent name| Show meaningful message where both apis return no data| Pass |![screenshot](documentation/form-defence2.png)| App logic ensures meaningful message displayed rather than null values returned from api |
| | Submit name and country for which one api returns data but the other does not | Show partial data that is returned, and meaningful message flaging where no data is returned| Pass |![screenshot](documentation/form-defence3.png)|Example shows Ageify api has returned no data but Genderize api has. No instances of Genderize returning data but Agify not returning were seen in manual testing but logic is included to handle this possibility|
| |Submit name without capitalization | Enforce capitalization of name in results display| Pass |![screenshot](documentation/form-defence4.png)|Example shows user inputs a lowercase name which is capitalized in results by app logic|

## User Story Testing

| User Story | Screenshot | Comments |
| --- | --- |----|
| As a new site user, I would like to enter a name and country, so that I can find the average age and probable gender for the name in that country. | ![screenshot](documentation/stories1.png) |the screenshot shows the result record for the input name "Matt" and country input "UK"|
| As a new site user, I would like to have results for multiple requests shown as a list, so that I can make comparisons e.g. same name in different countries. | ![screenshot](documentation/stories2.png) | the screenshot shows a list of results records for multiple queries in a format that allows easy comparisons|
| As a new site user, I would like to have the ability to remove unwanted results from display so that I can keep results uncluttered (for recording in a screen shot for example). The screenshots show the same results list before and after the result for a non-existent name is removed| ![screenshot](documentation/stories3a.png) |![screenshot](documentation/stories3b.png)||
| As a new user I would like to be able to find what proportion of people in the UK who are named Ashley are males?| ![screenshot](documentation/stories4.png) | the screenshot shows that roughly 1 in 10 people in the UK named Ashley are males|
| As a new user I would like to find the average age of people in USA who are named George? | ![screenshot](documentation/stories5.png) | the screenshot shows that in the USA, people named George have an average age of 72 |

## Bugs
- JS Uncaught  Type Error: `apiData.age_count = ageCount` can not set property value for undefined apiData object

    ![screenshot](documentation/uncaught-type-error.png)

    - To fix this, I _declared a new object, 
     ```js
         let apiData = new Object();
    ``` 
    allowing a property `age_count`
    to be set for `apiData` object.

- JS Uncaught  Type Error: `Cannot read properties of null`. This error was caused by javascript attempting to read a value from html input element too soon. 
 
    ![screenshot](documentation/can-not-read-properties-of-null.png)

    - To fix this, I included the following code to add an event listener for the DOM loaded event, 
     ```js
     document.addEventListener("DOMContentLoaded", ()=>{..})
     ```
  
- Preventing default `submit` event for html `<form>` element: This issue prevented getting form user input before the default behavior.  
   

    - To fix this, I included the following code to prevent default `<form>` submission behavior; 
    ```js
    form.addEventListener("submit", (event)=> {
    event.preventDefault()....
    ```
## Unfixed Bugs
There are no remaining bugs that I am aware of.