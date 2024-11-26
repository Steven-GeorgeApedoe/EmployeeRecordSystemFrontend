const form = document.querySelector('form');

// Event listener for login button click
form.addEventListener('submit',  (event) => {
    // Prevent form from submitting
    event.preventDefault();

    let emailField = document.querySelector(".email").value
    let passwordField = document.querySelector(".password").value
    
    // Get form values
    console.log(`Email: ${emailField} || Password: ${passwordField}`);

    axios.post(`${ENV.API_URL}/auth/login`,{email:emailField, password:passwordField}).then(res=>{
        if(res.data.msg === "Login successful"){
            window.location.href = 'EmployeeSection.html';
        }
        console.log(res.data);
    }).catch(err=>{
        console.log(err.message);
    });
})
