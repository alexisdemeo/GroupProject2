
let site = "";
let article = "";
let positive_sentiment = "";
let category = "";
let comments = "";
let email = "";

const popup = document.querySelector("#popup");
console.log(popup); 

// ************ Event Listeners *************
// same idea as using arrow notation
// function getSentiment(e) {
//     console.log(e.target);
// }

const getSentiment = (e) => {
    console.log(e.srcElement.offsetParent.value);
    positive_sentiment = e.srcElement.offsetParent.value; 
    console.log("Positive sentiment: " + positive_sentiment);
}

const loadFormFunctions = () => {
        // const likeBtn = document.querySelector(".re-widget-btn-round-like");
        // const dislikeBtn = document.querySelector(".re-widget-btn-round-dont");
        // likeBtn.addEventListener("click", getSentiment);
        // dislikeBtn.addEventListener("click", getSentiment); 
        const btnWrapper = document.querySelector(".re-widget-btn-wrapper-f1");
        btnWrapper.addEventListener("click", getSentiment);

        // Send data to API Gateway

        

    }


const btn = document.querySelector("#submit")
// const likeBtn = document.querySelector('#')

// ******** Make getFromS3 its own helper function, parameter URL. ************
// ******** loadFormFunctions needs to happen after async code ***********

async function getFromS3() {
   
    console.log("Fired")
    await fetch('https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1.html', {
    }).then((response) => { 
        console.log("Response from S3")
        return response.text()

    }).then((text) => {
        console.log(text)
        popup.innerHTML = "";
        popup.innerHTML = text;
        loadFormFunctions(); 
    })
    
}

btn.addEventListener("click", getFromS3);





// Display re widget on scroll
// window.addEventListener("scroll", myFunction);

// function myFunction() {
//     let widget = document.getElementById("re-widget")
// need to add is hidden class to re-widget
//     widget.classList.remove('is-hidden');
// }

