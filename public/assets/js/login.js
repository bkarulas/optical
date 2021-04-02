window.onload = function(){
   
    console.log("page is ready");
    document.getElementById('login-Form').addEventListener("click",  e => {
        e.preventDefault();
        let email = document.getElementById('form-email').value.trim().toLowerCase()
        let password = document.getElementById('form-password').value

        let alert = document.getElementById('form-alert');

        if(!email || !password){
            alert.innerHTML = "Please enter in both your email and password";
            alert.style.display = 'block';
            return false;
        }

        let info = {
            username: email,
            password: password
        };
        console.log(info);

        fetch("/auth/login",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        })
        .then(function (response) {
            console.log('And the response is:... ')
            console.log(response)
            window.location.replace("/");        
        }).catch(err => {
            console.log(err.status);
            if (err.status === 401) {
                alert.innerHTML = "Invalid user or password";
                alert.style.display = 'block';
            }
        });
    });
};

