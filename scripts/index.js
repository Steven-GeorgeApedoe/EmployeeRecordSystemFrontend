const form = document.querySelector("form");
const login = document.querySelector("button");

// Event listener for login button click
form.addEventListener("submit", (event) => {
  // Prevent form from submitting
  event.preventDefault();

  let emailField = document.querySelector(".email").value;
  let passwordField = document.querySelector(".password").value;

  // Get form values
  console.log(`Email: ${emailField} || Password: ${passwordField}`);

  axios
    .post(`${ENV.API_URL}/auth/login`, {
      email: emailField,
      password: passwordField,
    })
    .then((res) => {
      login.disabled = true;
      login.textContent = "Loading...";

      if (res.data.msg === "Login successful") {
        if (
          res.data.employee.position === "HR" ||
          res.data.employee.position === "Manager"
        ) {
          const employeeDetails = res.data.employee;
          localStorage.setItem("userDetails", JSON.stringify(employeeDetails));
          window.location.href = "hrManagerSection.html";
        } else {
          const employeeDetails = res.data.employee;
          localStorage.setItem("userDetails", JSON.stringify(employeeDetails));
          window.location.href = "EmployeeSection.html";
        }
      }
      console.log(res.data);
    })
    .catch((err) => {
        login.disabled = false;
      login.textContent = "Login";
      alert(err.response.data)
    })
    // .finally(() => {
    //   // Re-enable the button and restore its text
    //   login.disabled = false;
    //   login.textContent = "Login";
    // });
});

const date = new Date().toISOString().split("T")[0];
console.log(date);
