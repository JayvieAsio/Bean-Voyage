// Nagpapakita ng confirmation kapag nag-click ang user sa feedback button.
document.querySelector("#shareReview").addEventListener("click", () => {
  document.querySelector("#feedbackStatus").textContent = "Thank you for helping Bean Voyage grow!";
});


const reviews = document.querySelectorAll(".review");
const prevButton = document.getElementById("prevReview");
const nextButton = document.getElementById("nextReview");

let currentReview = 0;


// Show 3 reviews at a time
function showReviews() {

    reviews.forEach(review => {
        review.style.display = "none";
    });

    // Show current 3 reviews
    for (let i = 0; i < 3; i++) {

        let index = (currentReview + i) % reviews.length;

        reviews[index].style.display = "flex";

    }

    // Make the middle review red
    reviews.forEach(review => {
        review.classList.remove("featured-review");
    });

    let middleIndex = (currentReview + 1) % reviews.length;

    reviews[middleIndex].classList.add("featured-review");

}


// NEXT BUTTON
nextButton.addEventListener("click", function () {

    currentReview++;

    if (currentReview >= reviews.length) {
        currentReview = 0;
    }

    showReviews();

});


// PREVIOUS BUTTON
prevButton.addEventListener("click", function () {

    currentReview--;

    if (currentReview < 0) {
        currentReview = reviews.length - 1;
    }

    showReviews();

});


// Initial display
showReviews();