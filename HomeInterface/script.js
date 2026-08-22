// Ipinapakita ang item na nadagdag sa demo cart.
document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#cartStatus").textContent = `${button.dataset.product} added to your cart.`;
  });
});
