const greeting = document.querySelector(".greeting");
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const newEmpolyeeForm = document.querySelector(".newEmpolyeeForm");

if (userDetails) {
  greeting.textContent = `Welcome ${userDetails.firstName} ${userDetails.lastName}`;
}

newEmpolyeeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = "test";
  const position = document.getElementById("position").value;
  const department = document.getElementById("department").value;
  const newEmployee = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    position,
    department,
  };

  try {
    axios.post(`${ENV.API_URL}/auth/signup`, newEmployee).then((res) => {
      alert(`${res.data.msg}`);
      window.location.href = "hrManagementSections.html";
    });
  } catch (err) {
    console.log(err.response.data);
  }
});
