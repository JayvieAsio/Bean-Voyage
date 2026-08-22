// Nagpapakita ng confirmation kapag nag-click ang user sa feedback button.
document.querySelector("#shareReview").addEventListener("click", () => {
  document.querySelector("#feedbackStatus").textContent = "Thank you for helping Bean Voyage grow!";
});
