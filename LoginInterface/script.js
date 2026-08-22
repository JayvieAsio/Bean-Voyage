const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const formStatus = document.querySelector("#formStatus");
const togglePassword = document.querySelector("#togglePassword");

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.removeAttribute("aria-invalid");
  passwordInput.removeAttribute("aria-invalid");
  formStatus.textContent = "";
}

function validateForm() {
  let isValid = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  clearErrors();

  if (!email) {
    emailError.textContent = "Please enter your email address.";
    emailInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (!emailInput.validity.valid) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.setAttribute("aria-invalid", "true");
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = "Please enter your password.";
    passwordInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Your password must be at least 6 characters.";
    passwordInput.setAttribute("aria-invalid", "true");
    isValid = false;
  }

  return isValid;
}

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  togglePassword.setAttribute("title", isPassword ? "Hide password" : "Show password");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  const submitButton = loginForm.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Signing in...";

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Sign in";
    formStatus.textContent = `Welcome back, ${emailInput.value.trim()}!`;
  }, 700);
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (input === emailInput) emailError.textContent = "";
    if (input === passwordInput) passwordError.textContent = "";
  });
});

document.querySelector("#forgotPassword").addEventListener("click", (event) => {
  event.preventDefault();
  formStatus.textContent = "Password reset instructions are on their way.";
});

document.querySelector("#createAccount").addEventListener("click", (event) => {
  event.preventDefault();
  formStatus.textContent = "Account creation will be available soon.";
});

document.querySelectorAll(".social-button").forEach((button) => {
  button.addEventListener("click", () => {
    formStatus.textContent = `${button.dataset.provider} sign-in will be available soon.`;
  });
});
