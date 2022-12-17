let errors = [];
// let label = document.querySelectorAll("label").textContent;

function checkValidity(input) {
  let validity = input.validity;

  if (validity.valueMissing) {
    errors.push("Поле " + '"' + input.placeholder + '"' + " не заполнено");
  }
  if (validity.patternMisMatch) {
    errors.push("Invalid format");
  }
  if (validity.rangeOverflow) {
    let max = input.getAttribute("max");
    errors.push(
      `Maximum value of the "${input.placeholder}" field cannot exceed ${max}`
    );
  }
  if (validity.rangeUnderflow) {
    let min = input.getAttribute("min");
    errors.push(
      `Minimum value of the "${input.placeholder}" field cannot be less than ${min}`
    );
  }
  if (validity.tooShort) {
    let minlength = input.getAttribute("minlength");
    errors.push(
      `Minimum value of the "${input.placeholder}" field cannot be less than ${minlength}`
    );
  }
  if (input.id == "lastname") {
    let lastname = document.querySelector("#lastname").value;
    if (lastname.length > 10) {
      errors.push(`Длина "${input.placeholder}" не должна быть больше 10`);
    }
  }
  //   if (validity.tooLong) {
  //     let maxlength = input.getAttribute("maxlength");
  //     errors.push("Максимальное значение не может быть больше " + maxlength);
  //   }
}

// ------------ POST-ЗАПРОС -------------

function sendForm() {
  // event.preventDefault();

  errors = [];
  let inputs = document.querySelectorAll("input");

  for (let input of inputs) {
    checkValidity(input);
  }
  validateEmailAd();
  document.getElementById("errorsInfo").innerHTML = errors.join(", <br>");

  let user = {
    firstname: document.querySelector("#firstname").value,
    lastname: document.querySelector("#lastname").value,
    age: document.querySelector("#age").value,
    login: document.querySelector("#login").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    contacts: document.querySelector("#phone").value,
  };
  console.log(user);
  fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=utf-8" },
  })
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
    })
    .catch((error) => console.log(error));
}

function validateEmailAd() {
  let emailField = document.querySelector("#email").value;
  let mailFormat =
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!emailField.match(mailFormat) && emailField != "") {
    errors.push("Ваш адрес электронной почты введен неверно!");
  }
}
