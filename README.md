fetch api ref
https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

## Bugs
* Scope problem when function defined in main scope instead of "submit function"
scope where it is called

* Problem with asynchronous console logging of the apiData response object before data actually fetched from api. Solved by moving logging function into .then function after last api call see code snippet below
```javascript
fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let genderData = data

                    // put api gender data response into apiData object using spread operator

                    apiData = {...apiData, ...genderData}

                    // log response object to console to test functionality

                    console.log("genderize")
                    
                })
                // *****results data only logged after api data received*****
                .then(()=> {
                    console.log(apiData.age, apiData.gender)
                })
        }
    
    // call functions
    agify()
    genderize()
    //***** below does not work as executes before data received from api*****

    console.log(apiData)
    
```
![screenshot](MS2/documentation/undefined-age-bug.png)
