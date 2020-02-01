// Display re widget on scroll
window.addEventListener("scroll", myFunction);

function myFunction() {
    let widget = document.getElementById("re-widget")
    widget.classList.remove('is-hidden');
}