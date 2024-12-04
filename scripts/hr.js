const greeting = document.querySelector(".greeting");
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const newEmpolyeeForm = document.querySelector(".newEmpolyeeForm");
const signOutBtn = document.querySelector(".sign-out-container");
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
    axios.post(`${ENV.API_DEPLOY_URL}/auth/signup`, newEmployee).then((res) => {
      alert(`${res.data.msg}`);
      window.location.href = "hrManagementSections.html";
    });
  } catch (err) {
    console.log(err.response.data);
  }
});

const leaveRequestsContainer = document.querySelector(".leave-requests");
const onLeaveContainer = document.querySelector(".on-leave-list");
const rejectedRequestsContainer = document.querySelector(".rejected-requests");

function fetchLeaveRequests() {
  axios
    .get(`${ENV.API_DEPLOY_URL}/leave/allLeaveRequests`)
    .then((response) => {
      const leaveRequests = response.data.data;
      leaveRequestsContainer.innerHTML = ""; // Clear existing leave requests
      onLeaveContainer.innerHTML = ""; // Clear existing on-leave requests
      rejectedRequestsContainer.innerHTML = ""; // Clear existing rejected requests

      leaveRequests.forEach((request) => {
        const requestCard = document.createElement("div");
        requestCard.classList.add("request-card");

        // Create elements for each piece of information
        const employeeName = document.createElement("p");
        employeeName.textContent = `Employee: ${request.employeeName}`;

        const startDate = document.createElement("p");
        startDate.textContent = `Start Date: ${new Date(
          request.startDate
        ).toLocaleDateString()}`;

        const endDate = document.createElement("p");
        endDate.textContent = `End Date: ${new Date(
          request.endDate
        ).toLocaleDateString()}`;

        const reason = document.createElement("p");
        reason.textContent = `Reason: ${request.reason}`;

        const statusSelect = document.createElement("select");
        statusSelect.classList.add("status-select");
        statusSelect.dataset.requestId = request._id;

        const statuses = ["Pending", "Approved", "Rejected"];
        statuses.forEach((status) => {
          const option = document.createElement("option");
          option.value = status;
          option.textContent = status;
          if (status === request.status) {
            option.selected = true;
          }
          statusSelect.appendChild(option);
        });

        // Disable status change if the request is approved
        if (request.status === "Approved") {
          statusSelect.disabled = true;
        }

        // Append all elements to the request card
        requestCard.appendChild(employeeName);
        requestCard.appendChild(startDate);
        requestCard.appendChild(endDate);
        requestCard.appendChild(reason);
        requestCard.appendChild(statusSelect);

        // Add event listener for status change
        statusSelect.addEventListener("change", function () {
          const requestId = this.dataset.requestId;
          const newStatus = this.value;

          if (newStatus === "Rejected") {
            if (!confirm("Are you sure you want to reject this request?")) {
              this.value = request.status; // Reset to previous status if not confirmed
              return;
            }
          }

          axios
            .put(`${ENV.API_DEPLOY_URL}/leave/updateStatus`, {
              requestId,
              status: newStatus,
            })
            .then((response) => {
              alert("Status updated successfully");
              fetchLeaveRequests(); // Refresh the requests to update the UI
            })
            .catch((error) => {
              console.error("Error updating status:", error);
              alert("Failed to update status");
            });
        });

        // Append the request card to the appropriate section
        if (request.status === "Approved") {
          onLeaveContainer.appendChild(requestCard);
        } else if (request.status === "Rejected") {
          rejectedRequestsContainer.appendChild(requestCard);
        } else {
          leaveRequestsContainer.appendChild(requestCard);
        }
      });

      // Add placeholder text if no requests are present
      if (leaveRequestsContainer.innerHTML === "") {
        leaveRequestsContainer.innerHTML = "<p>No new requests</p>";
      }
      if (rejectedRequestsContainer.innerHTML === "") {
        rejectedRequestsContainer.innerHTML = "<p>No rejected requests</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching leave requests:", error);
    });
}

// Fetch and display department data
function fetchDepartments() {
  axios
    .get(`${ENV.API_DEPLOY_URL}/departmentData`)
    .then((response) => {
      const departments = response.data.data;
      console.log(departments);
      const departmentTableBody = document.querySelector(
        ".departments-section tbody"
      );
      departmentTableBody.innerHTML = ""; // Clear existing rows

      departments.forEach((department) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><i class='bx bx-buildings'></i> ${department._id}</td>
          <td>${department.totalNumber}</td>
          <td>${department.vacancies}</td>
        `;
        departmentTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
}

// Fetch and display employee data
function fetchEmployees() {
  axios
    .get(`${ENV.API_DEPLOY_URL}/employeeData`)
    .then((response) => {
      const employees = response.data.data;
      const employeeStats = document.querySelector(".employee-stats");
      const totalEmployees = employees.length;
      const onSite = employees.filter(
        (emp) => emp.workLocation === "on-site"
      ).length;
      const remote = totalEmployees - onSite;

      employeeStats.innerHTML = `
        <p><i class='bx bx-group'></i> ${totalEmployees} Employees</p>
        <div>
          <span class="dot green"></span> ${onSite} on-site
          <span class="dot yellow"></span> ${remote} remote
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
    });
}

// Call the functions to fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchLeaveRequests();
  fetchDepartments();
  fetchEmployees();
});


signOutBtn.addEventListener("click", () => {
  alert("Sign out successful")
  localStorage.removeItem("userDetails");
  window.location.href = "index.html";
});