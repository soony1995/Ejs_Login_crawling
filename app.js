const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const z = document.getElementById("btn");

function register() {
  loginForm.style.left = "-360px";
  registerForm.style.left = "50px";
  z.style.left = "110px";
}

function login() {
  loginForm.style.left = "50px";
  registerForm.style.left = "650px";
  z.style.left = "0px";
}
