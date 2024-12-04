// Example function that might be used for reports
function fetchReportData() {
  axios
    .get(`${ENV.API_DEPLOY_URL}/reportData`)
    .then((response) => {
      const reportData = response.data.data;
      // Process and display report data
    })
    .catch((error) => {
      console.error("Error fetching report data:", error);
    });
}

// Call the function to fetch report data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchEmployees();
});

function fetchEmployees() {
  axios
    .get(`${ENV.API_DEPLOY_URL}/employeeData`)
    .then((response) => {
      const employees = response.data.data;
      console.log(employees);
      const employeeList = document.getElementById("employee-list");
      employeeList.innerHTML = ""; // Clear existing list

      employees.forEach((employee) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );
        listItem.innerHTML = `
          ${employee.firstName} ${employee.lastName}
          <button class="btn btn-primary" onclick="generateReport('${employee._id}')">
            <i class='bx bx-file'></i> Generate Report
          </button>
        `;
        employeeList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
    });
}

function generateReport(employeeId) {
  axios
    .get(`${ENV.API_DEPLOY_URL}/reports/employee/${employeeId}/report`)
    .then((response) => {
      const reportData = response.data;

      // Extract attendance data
      const attendanceRecords = reportData.attendance
        .map((record) => `${record.date}: ${record.value}`)
        .join("; ");

      // Create CSV structure
      const csvData = `
        Name,Position,Department,Attendance
        ${reportData.name},${reportData.position},${reportData.department},"${attendanceRecords}"
      `;

      // Create a Blob from the CSV data
      const blob = new Blob([csvData], { type: "text/csv" });

      // Create a link element to download the Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${reportData.name.replace(" ", "_")}_report.csv`;

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      alert(`Report for ${reportData.name} generated successfully!`);
    })
    .catch((error) => {
      console.error("Error generating report:", error);
    });
}

const signOutBtn = document.querySelector(".sign-outBtn");

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("userDetails");
  alert("Signed out successfully!");
  window.location.href = "index.html";
});

