
// const btn = document.querySelector("#submit")
// const content = document.querySelector("#re-widget")

// async function getFromS3() {
//     console.log("Fired")
//     await fetch('https://sample-form-bucket.s3-ap-southeast-2.amazonaws.com/index.html', {
//     }).then((response) => {
//         console.log("Response from S3")
//         // const res = response.text()

//         // console.log(response.json())
//         // return response.json();
//         return response.text()

//     }).then((text) => {
//         console.log(text)
//         content.innerHTML = text
//     })
// }

// btn.addEventListener("click", getFromS3)

// console.log("Hello world")

// Selecting div provided to client
const widget = document.querySelector("#re-widget")


// Create form
const b = document.createElement('button');
b.setAttribute('content', 'test content');
b.setAttribute('class', 'btn');
b.innerHTML = 'Next';

widget.appendChild(b)

const renderNext = () => {
    console.log("Next form")
}

b.addEventListener("click", renderNext)


