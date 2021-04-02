var errorMessage = "";
document.getElementById('signup-form').addEventListener("click",  e => {
    e.preventDefault();
    let fname = document.getElementById('form-fname').value.trim().toLowerCase()
    let lname = document.getElementById('form-lname').value.trim().toLowerCase()
    let email = document.getElementById('form-email').value.trim().toLowerCase()
    let password = document.getElementById('form-password').value
    console.log(`${fname} - ${lname} - ${email} - ${password}`)
    let alert = document.getElementById('form-alert');
    if(!email || !password || !fname || !lname){
        alert.innerText = "Please enter all required information";
        alert.style.display = 'block';
        return;
    }
    let info = {
        email: email,
        password: password,
        firstName: fname,
        lastName: lname
    };

    errorMessage = ValidateInput(info);

    if(errorMessage.length > 0){
        alert.innerHTML = errorMessage;
        alert.style.display = 'block';
        return;
    }   

    fetch("/auth/signup",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({info})
    })
    .then(function (res) {
        if (res.ok){
            window.location.replace("/login");
        }else{
            alert.innerHTML = 'The email address already exist, please use an new email address';
            alert.style.display = 'block';
        }
                
    })
})
