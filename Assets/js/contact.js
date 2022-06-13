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
      Swal.fire("Good job!", "You clicked the button!", "success").then(() => {
        document.getElementById("contactForm").reset();
      });
    });
})();
