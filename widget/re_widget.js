// variables for feedback form inputs as well as site and the relating article
let site = "";
let article = "";
let positive_sentiment = "";
let category = "";
let comments = "";
let email = "";

// variable to track current form (default setting to 1 for F1)
let currentForm = 1;

// variable to track sentiment track (like or dont)
// default setting is empty and will be set during F1 sentiment selection
let sentimentTrack = "";

// first feedback form URL 
const firstFormURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1.html";

const popup = document.querySelector("#popup");
console.log(popup);

// function that handles the active status for the categories on f2


// function takes current form value and selects the appropriate form elements and adds listeners
const loadFormEventListeners = (currentForm) => {
    switch (currentForm) {
        case 1:
            // gets buttons
            const likeBtn = document.querySelector(".re-widget-btn-like");
            const dontBtn = document.querySelector(".re-widget-btn-dont");

            // display previously saved values as active
            if (sentimentTrack != "") {
                // show selected sentiment as active
            }

            // passes sentiment for saving
            likeBtn.addEventListener("click", setSentiment("like"));
            dontBtn.addEventListener("click", setSentiment("dont"));

            //needs to set the sentimentTrack variable to like or dont
            likeBtn.addEventListener("click", formNavigation("like"));
            dontBtn.addEventListener("click", formNavigation("dont"));

            //exit button
            // const exit = document.querySelector("re-widget-btn-exit");
            break;

        case 2:
            // gets categories buttons
            let categoryBtns = [];
            categoryBtns = document.querySelectorAll("re-widget-btn-category");

            // display previously saved values as active
            if (category != "") {
                // show selected category as active
                //check if the category matches any of the category buttons text and make it active
                for (i = 0; i < categoryBtns.length; i++) {
                    if (categoryBtns[i].innerHTML == category) {
                        categoryBtns[i].classList.add('re-widget-active');
                    }
                }

            }

            // gets next and back buttons
            const backBtn = document.querySelector("re-widget-btn-back");
            const nextBtn = document.querySelector("re-widget-btn-next");

            // form navigation
            backBtn.addEventListener("click", formNavigation("back"));
            nextBtn.addEventListener("click", formNavigation("next"));

            // exit button
            // const exit = document.querySelector("re-widget-btn-exit");
            break;

        case 3:
            // back and submit buttons
            const backBtn = document.querySelector("re-widget-btn-back");
            const submitBtn = document.querySelector("re-widget-btn-submit");

            // display previously saved values as active
            if (comments != "") {
                // display comments
                document.querySelector("re-widget-input-comments").innerHTML = comments;
            }

            if (email != "") {
                // display email
                document.querySelector("re-widget-input-email").innerHTML = email;
            }

            // get and save local values
            submitBtn.addEventListener("click", function {
                comments = document.querySelector("re-widget-input-comments").value;
                email = document.querySelector("re-widget-input-email").value;
            });

            // form navigation
            backBtn.addEventListener("click", formNavigation("back"));
            submitBtn.addEventListener("click", formNavigation("submit"));

            // exit button
            // const exit = document.querySelector("re-widget-btn-exit");
            break;

        case 4:
            // exit button
            // const exit = document.querySelector("re-widget-btn-exit");
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


// on load code that loads the first form (2 options for testing)
// option 1
// window.onload = function() {
//     loadFromS3(firstFormURL);
// }

// option 2
document.addEventListener("DOMContentLoaded", function() {
    loadFromS3(firstFormURL);
})

// helper function that takes url and loads html from S3
async function loadFromS3(url) {

    console.log("Fired")
    await fetch(url, {}).then((response) => {
        console.log("Response from S3")
        return response.text()

    }).then((text) => {
        console.log(text)
        popup.innerHTML = "";
        popup.innerHTML = text;
        loadFormEventListeners(currentForm);
    })

}

// function that handles the navigation logic for the back, next 
// and submit buttons and then passes it on to the navigation helper function
function formNavigation(action) {

    if (action == "like" || action == "dont") {
        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        // updates current form to the previous form value
        currentForm = nextForm;

    } else if (action == "back") {
        // logic for back
        let previousForm = currentForm - 1;
        navigationHelper(previousForm, sentimentTrack);
        // updates current form to the previous form value
        currentForm = previousForm;

    } else if (action == "next") {
        // logic for next
        // trigger save logic here
        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        // updates current form to the next form value
        currentForm = nextForm;

    } else if (action == "submit") {
        // logic for submit
        // trigger save logic here

        let nextForm = currentForm + 1;
        navigationHelper(nextForm, sentimentTrack);
        // updates current form to the next form value
        currentForm = nextForm;
    } else if (action == "exit") {
        // logic for exit
        // trigger save logic here

    } else {
        alert("Form Error");
    }

}

// function takes the required form value and passes it 
// on to S3 load helper function with the appropriate URL
function navigationHelper(formToLoad, sentimentTrack) {
    switch (formToLoad) {
        case 1:
            let f1URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1.html"
            loadFromS3(f1URL);
            break;

        case 2:
            if (sentimentTrack == "like") {
                let f2LikeURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f2.html"
                loadFromS3(f2LikeURL)
            } else {
                let f2DontURL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f2.html"
                loadFromS3(f2DontURL)
            }
            break;

        case 3:
            let f3URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f3.html"
            loadFromS3(f3URL)
            break;

        case 4:
            let f4URL = "https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f4.html"
            loadFromS3(f4URL)
            break;

        default:
            alert("Error")
    }
    // pass url to helper function that gets html from S3

}






// Submit button Logic





// Display re widget on scroll
// window.addEventListener("scroll", myFunction);

// function myFunction() {
//     let widget = document.getElementById("re-widget")
// need to add is hidden class to re-widget
//     widget.classList.remove('is-hidden');
// }