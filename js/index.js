var log_email = document.getElementById("mail");
var log_pass = document.getElementById("pass");
var sign_email = document.getElementById("mail2");
var sign_pass = document.getElementById("pass2");
var sign_userName = document.getElementById("name");
var addText = document.getElementById("add");
var but_log = document.getElementById("but-log");
var but_sin = document.getElementById("but-sin");
var but_user = document.getElementById("but-user");

var collectDataLogin = [];

var collectDataSignup;

if (localStorage.getItem("data") == null) {
  collectDataSignup = [];
} else {
  collectDataSignup = JSON.parse(localStorage.getItem("data"));
}

function createDataAtLogin() {
  var dataInput_login = {
    login_mail: log_email.value,
    login_pass: log_pass.value,
  };

  collectDataLogin.push(dataInput_login);

  console.log(collectDataLogin);
}

function clearsignup() {
  sign_userName.value = null;
  sign_email.value = null;
  sign_pass.value = null;
}
function clearsignin() {
  log_email.value = null;
  log_pass.value = null;
}
function createDataAtSignup() {
  var dataInput_signup = {
    sign_user: sign_userName.value,
    sign_emil: sign_email.value,
    sign_password: sign_pass.value,
  };
  collectDataSignup.push(dataInput_signup);

  console.log(collectDataSignup);
  localStorage.setItem("data", JSON.stringify(collectDataSignup));
  clearsignup();
}
var logins;

function check() {
  if (collectDataLogin === 0) {
    console.log("Data fail");
    return;
  }
  var lastLogin = collectDataLogin[collectDataLogin.length - 1];
  var success = false;
  for (var i = 0; i < collectDataSignup.length; i++) {
    var chickin =
      collectDataSignup[i].sign_emil === lastLogin.login_mail &&
      collectDataSignup[i].sign_password === lastLogin.login_pass;
    if (chickin) {
      logins = collectDataSignup[i].sign_user;
      localStorage.setItem("currentUser", logins);
      window.location.href = "js/user.html";
      success = true;
      break;
    }
  }
  if (!success) {
    alert("email or password fail");
    clearsignin();
  }
}

if (addText) {
  var currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    addText.innerHTML = `<h1>Welcome ${currentUser}</h1>`;
  } else {
    console.log("data currentUser Null");
  }
}

// Event Listeners
but_log.addEventListener("click", function () {
  createDataAtLogin();

  check();
});
