// variables to save information related to feedback
let site = window.location.origin;
let article = window.location.href;
let positive_sentiment = "";
// let category = "0";
let comments = "";
let email = "";

// Categories 
let cat1 = "0";
let cat2 = "0";
let cat3 = "0";
let cat4 = "0";
let cat5 = "0";
let cat6 = "0";
let cat7 = "0";
let cat8 = "0";

// Temporary array that will later be used to populate category
// Set this array length to the max number of categories that could
// be selected (8)
let selectedCategories = Array.from(Array(8).keys())

// variable to track current form (default setting to 1 for F1)
let currentForm = 1;

// variable to track sentiment track (like or dont)
// default setting is empty and will be set during F1 sentiment selection
let sentimentTrack = "";

// first feedback form URL 
const firstFormURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1.html";

// Get div with ID "re-widget-container" from client side
let reWidget = document.querySelector("#re-widget-container");

// on load code that loads the first form
window.onload = function() {
    loadFromS3(firstFormURL)
}

// function takes current form value and selects the appropriate form elements and adds listeners
const loadFormEventListeners = (currentForm) => {
    console.log("loadFormEventListeners");
    // declare all the buttons for switch cases
    let likeBtn = document.querySelector('.re-widget-btn-like');
    let dontBtn = document.querySelector('.re-widget-btn-dont');
    let backBtn = document.querySelector('.re-widget-btn-back');
    let nextBtn = document.querySelector('.re-widget-btn-next');
    let submitBtn = document.querySelector('.re-widget-btn-submit');
    let exitBtn = document.querySelector('.re-widget-exit-button');
    // gets categories buttons into array
    let categoryBtns = Array.from(document.querySelectorAll('.re-widget-btn-category'));

    switch (currentForm) {
        case 1:
            console.log("is firing current form 1");
            // passes sentiment for saving
            likeBtn.addEventListener("click", function() { setSentiment("like") });
            dontBtn.addEventListener("click", function() { setSentiment("dont") });
            // form navigation
            likeBtn.addEventListener("click", function() { formNavigation("like") });
            dontBtn.addEventListener("click", function() { formNavigation("dont") });
            // exit button
            exitBtn.addEventListener("click", function() { formNavigation("exit") });
            break;

        case 2:
            // display previously saved values as active
            // if (category != "") {
            //     // show selected category as active
            //     //check if the category matches any of the category buttons text and make it active
            //     for (i = 0; i < categoryBtns.length; i++) {
            //         if (categoryBtns[i].innerHTML == category) {
            //             categoryBtns[i].classList.add('re-widget-active');
            //         }
            //     }
            // };

            // add event listener to all category buttons
            // toggle active class and save values to 
            // selecteCategories array for later use
            categoryBtns.forEach(btn => {

                btn.addEventListener("click", function(event) {
                    toggleSelected(event)
                })

                const toggleSelected = (event) => {
                    if (event.target.classList.contains('re-widget-active')) {
                        event.target.classList.remove('re-widget-active');
                        const index = selectedCategories.indexOf(event.target.innerHTML);
                        if (index > -1) {
                            selectedCategories.splice(index, 1);
                        }
                    } else {
                        event.target.classList.add('re-widget-active');
                        selectedCategories.push(event.target.innerHTML)
                    }
                    console.log(selectedCategories)
                }
            });

            // form navigation
            backBtn.addEventListener("click", function() { formNavigation("back") });
            nextBtn.addEventListener("click", function() { formNavigation("next") });
            // exit button
            exitBtn.addEventListener("click", function() { formNavigation("exit") });
            break;

        case 3:
            // display previously saved values as active
            if (comments != "") {
                // display comments
                document.querySelector('.re-widget-input-comments').innerHTML = comments;
            }

            if (email != "") {
                // display email
                document.querySelector('.re-widget-input-email').innerHTML = email;
            }

            // get and save local values
            submitBtn.addEventListener("click", function() {
                comments = document.querySelector('.re-widget-input-comments').value;
                if (comments == "") {
                    comments = "0"
                }
                email = document.querySelector('.re-widget-input-email').value;
                if (email == "") {
                    email = "0"
                }
            });

            // form navigation
            backBtn.addEventListener("click", function() { formNavigation("back") });
            submitBtn.addEventListener("click", function() { formNavigation("submit") });
            // exit button
            exitBtn.addEventListener("click", function() { formNavigation("exit") });
            break;

        case 4:
            // exit button
            exitBtn.addEventListener("click", function() { formNavigation("exit") });
            break;

        default:
            alert("Error");
    }
}

// function sets the sentiment and saves value into local variable
const setSentiment = (sentiment) => {
    positive_sentiment = sentiment;
    sentimentTrack = sentiment;
}

// helper function that takes url and loads html from S3
async function loadFromS3(url) {
    console.log("loadFromS3");
    await fetch(url, {}).then((response) => {
        return response.text()
    }).then((text) => {
        console.log(text);
        reWidget.innerHTML = "";
        reWidget.innerHTML = text;
        loadFormEventListeners(currentForm);
    });
}

// function that handles the navigation logic for the back, next 
// and submit buttons and then passes it on to the navigation helper function
function formNavigation(action) {
    console.log("formNavigation");

    if (action == "like" || action == "dont") {
        console.log("like or dont");
        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        currentForm = nextForm;

    } else if (action == "back") {
        // logic for back button
        let previousForm = currentForm - 1;
        navigationHelper(previousForm, sentimentTrack);
        currentForm = previousForm;

    } else if (action == "next") {
        // logic for next button
        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        currentForm = nextForm;

    } else if (action == "submit") {
        // logic for submit button
        // Prepare local variables for saving
        categoryPrep();
        categoryAllocation();
        // Generate payload
        const payload = createPayload();
        // post data to API Gateway
        postData(payload);
        // display final form
        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        currentForm = nextForm;

    } else if (action == "exit") {
        reWidget.innerHTML = "";
    } else {
        alert("Form Error");
    }
};

// function loops through selectedCategories length (8) 
// and when value string is not empty then put "0". Now we have a 
// string with either valid categories or "0"
function categoryPrep() {
    for (let i = 0; i < selectedCategories.length; i++) {
        console.log("Selected Categories")
        if (selectedCategories[i] == "") {
            selectedCategories[i] = "0";
        }
    }
}

// function loops through the selectedCategories array and allocates
// values to appropriate variables
function categoryAllocation() {
    for (let i = 0; i < selectedCategories.length; i++) {
        console.log("Selected Categories")
        switch (i) {
            case 0:
                cat1 = selectedCategories[i];
                break;
            case 1:
                cat2 = selectedCategories[i];
                break;
            case 2:
                cat3 = selectedCategories[i];
                break;
            case 3:
                cat4 = selectedCategories[i];
                break;
            case 4:
                cat5 = selectedCategories[i];
                break;
            case 5:
                cat6 = selectedCategories[i];
                break;
            case 6:
                cat7 = selectedCategories[i];
                break;
            case 7:
                cat8 = selectedCategories[i];
                break;
        }
    }
}

// function takes the required form value and passes it 
// on to S3 load helper function with the appropriate URL
function navigationHelper(formToLoad, sentimentTrack) {
    console.log("navigationHelper");

    switch (formToLoad) {
        case 1:
            let f1URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1.html";
            loadFromS3(f1URL);
            break;

        case 2:
            if (sentimentTrack == "like") {
                let f2LikeURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f2_like.html";
                loadFromS3(f2LikeURL);
            } else {
                let f2DontURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f2_dont.html";
                loadFromS3(f2DontURL);
            };
            break;

        case 3:
            let f3URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f3.html";
            loadFromS3(f3URL);
            break;

        case 4:
            // NEED TO UPDATE THIS URL
            let f4URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f4.html";
            loadFromS3(f4URL);
            break;

        default:
            alert("Error");
    }
}

// Generate the JSON payload
const createPayload = () => {
    payload = {
        site: site,
        article: article,
        positive_sentiment: positive_sentiment,
        // category: category,
        cat1: cat1,
        cat2: cat2,
        cat3: cat3,
        cat4: cat4,
        cat5: cat5,
        cat6: cat6,
        cat7: cat7,
        cat8: cat8,
        comments: comments,
        email: email
    }
    return payload
}

// Send data to API Gateway
const postData = (payload) => {
    fetch('https://sso03h7hyg.execute-api.ap-southeast-2.amazonaws.com/dev/feedback', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(payload)
    })
}