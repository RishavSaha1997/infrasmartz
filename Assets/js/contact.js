// Accept only number
var specialKeys = new Array();
specialKeys.push(8); //Backspace
function IsNumeric(e) {
  var keyCode = e.which ? e.which : e.keyCode;
  var ret =
    (keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1;
  return ret;
}

// Just validate form validation
(() => {
  const validation = new JustValidate("#contactForm", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      fontSize: "14px",
      color: "#dc3545",
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Name is required",
      },
      {
        rule: "maxLength",
        value: 15,
      },
    ])
    .addField("#email", [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "email",
        errorMessage: "Email is invalid",
      },
    ])
    .addField("#phone", [
      {
        rule: "number",
        errorMessage: "Only number",
      },
      {
        rule: "minLength",
        value: 10,
        errorMessage: "10 digit phone number",
      },
      {
        rule: "maxLength",
        value: 10,
        errorMessage: "10 digit phone number",
      },
    ])
    .addField("#subject", [
      {
        rule: "required",
        errorMessage: "Subject is required",
      },
    ])
    .addField("#message", [
      {
        rule: "required",
        errorMessage: "Message is required",
      },
    ])
    .onSuccess((ev) => {
      ev.preventDefault();

      // Disable button
      let button = document.getElementById("submitBtn");
      button.innerHTML = "Please wait...";
      button.disabled = true;

      const form = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message"),
      };

      // Get form data
      let params = `name=${form.name.value}&email=${form.email.value}&phone=${form.phone.value}&subject=${form.subject.value}&message=${form.message.value}`;
      // Create XHR object
      var xhr = new XMLHttpRequest();
      // Open - type, url/file, async
      xhr.open("POST", "mailscript.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = function () {
        responseObject = JSON.parse(this.responseText);

        if (responseObject.msgType == true) {
          Swal.fire("Good job!", responseObject.msg, "success").then(() => {
            document.getElementById("contactForm").reset();
            button.innerHTML = "Submit";
            button.disabled = false;
          });
        } else {
          Swal.fire("Oops", responseObject.msg, "error").then(() => {
            document.getElementById("contactForm").reset();
            button.innerHTML = "Submit";
            button.disabled = false;
          });
        }
      };

      xhr.send(params);
    });
})();
