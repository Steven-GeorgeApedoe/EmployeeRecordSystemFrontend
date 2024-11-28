// Retrieve user details from localStorage
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

// Check if userDetails exists in localStorage
if (!userDetails) {
  alert('User details not found. Please log in again.');
  window.location.href = 'login.html'; // Redirect to login page if no userDetails
}

// Populate the profile section
document.querySelector('.name').textContent = `${userDetails.firstName} ${userDetails.lastName}`;
document.querySelector('.role').innerHTML = `<i class='bx bxs-briefcase'></i> ${userDetails.position}`;
document.querySelector('.department').innerHTML = `<i class='bx bxs-building-house'></i> ${userDetails.department}`;
if (userDetails.employmentType) {
  const employmentTag = document.createElement('span');
  employmentTag.classList.add('tag', 'full-time');
  employmentTag.textContent = userDetails.employmentType;
  document.querySelector('.tags').prepend(employmentTag);
}

// Populate General Information card
const generalInfoBox = document.querySelectorAll('.info-box')[0];
generalInfoBox.innerHTML = `
  <p><strong>Email:</strong> ${userDetails.email}</p>
  <p><strong>Phone:</strong> ${userDetails.phoneNumber || 'N/A'}</p>
`;

// Populate Employment Information card
const employmentInfoBox = document.querySelectorAll('.info-box')[1];
employmentInfoBox.innerHTML = `
  <p><strong>Position:</strong> ${userDetails.position}</p>
  <p><strong>Department:</strong> ${userDetails.department}</p>
  <p><strong>Start Date:</strong> ${new Date(userDetails.joinDate).toLocaleDateString() || 'N/A'}</p>
`;

// Dynamically adjust card heights for uniformity
function adjustCardHeights() {
  const cards = document.querySelectorAll('.info-card');
  let maxHeight = 0;

  // Calculate the maximum height of all cards
  cards.forEach((card) => {
    card.style.height = 'auto'; // Reset height to auto before measuring
    const cardHeight = card.offsetHeight;
    if (cardHeight > maxHeight) maxHeight = cardHeight;
  });

  // Apply the maximum height to all cards
  cards.forEach((card) => {
    card.style.height = `${maxHeight}px`;
  });
}

// Populate Recent Leave Requests card
const leaveRequestsBox = document.querySelectorAll('.info-box')[2];
if (userDetails.recentLeaveRequests && userDetails.recentLeaveRequests.length > 0) {
  userDetails.recentLeaveRequests.forEach((request) => {
    const leaveRequestItem = document.createElement('p');
    leaveRequestItem.innerHTML = `
      <strong>Type:</strong> ${request.leaveType}<br>
      <strong>Start:</strong> ${new Date(request.startDate).toLocaleDateString()}<br>
      <strong>End:</strong> ${new Date(request.endDate).toLocaleDateString()}<br>
      <strong>Status:</strong> ${request.status}<br>
    `;
    leaveRequestsBox.appendChild(leaveRequestItem);
  });
} else {
  leaveRequestsBox.innerHTML = '<p>No recent leave requests.</p>';
}

// Adjust heights on load and window resize
window.addEventListener('load', adjustCardHeights);
window.addEventListener('resize', adjustCardHeights);

// Handle sign out
document.querySelector('.sign-outBtn').addEventListener('click', () => {
  localStorage.removeItem('userDetails');
  alert('Signed out successfully.');
  window.location.href = 'index.html'; // Redirect to login page
});
