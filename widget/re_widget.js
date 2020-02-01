
let site = "";
let article = "";
let positive_sentiment = "";
let category = "";
let comments = "";
let email = "";

const popup = document.getElementById("popup");
console.log(popup); 

// Display re widget on scroll
// window.addEventListener("scroll", myFunction);

// function myFunction() {
//     let widget = document.getElementById("re-widget")
// need to add is hidden class to re-widget
//     widget.classList.remove('is-hidden');
// }

const btn = document.querySelector("#submit")

async function getFromS3() {
    console.log("Fired")
    await fetch('https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/re_widget_f1-test.html', {
    }).then((response) => {
        console.log("Response from S3")
        // const res = response.text()

        // console.log(response.json())
        // return response.json();
        return response.text()

    }).then((text) => {
        console.log(text)
        popup.innerHTML = "";
        popup.innerHTML = text;
    })
}

btn.addEventListener("click", getFromS3)


