const empName = document.querySelector('.name')
const empRole = document.querySelector('.role')
const empDepartment = document.querySelector('.department')

const phone = document.querySelector('.phoneNumber')
const email = document.querySelector('.email')
const userDetails = localStorage.getItem('userDetails')

const position = document.querySelector('.position')
const dep = document.querySelector('.dep')
const startDate = document.querySelector('.startDate')

if (userDetails) {
  const userData = JSON.parse(userDetails)
  empName.textContent = `${userData.firstName} ${userData.lastName}`
  empRole.textContent = userData.position
  empDepartment.textContent = userData.department

  phone.innerHTML = `<p><strong>Phone:</strong> ${userData.phoneNumber}</p>`
  email.innerHTML = `<p><strong>Email:</strong> ${userData.email}</p>`

  position.innerHTML = `<p><strong>Position:</strong> ${userData.position}</p>`
  dep.innerHTML = `<p><strong>Department:</strong> ${userData.department}</p>`
  startDate.innerHTML = `<p><strong>Start Date:</strong> ${userData.startDate.split("T")[0]}</p>`
}   