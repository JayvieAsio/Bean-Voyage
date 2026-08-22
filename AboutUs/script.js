// Pinapanatili ang About page na handang tumanggap ng shared page interactions.
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("focus", () => link.classList.add("active"));
});
