function addNewCustomer(){
    fetch("/api/customer/new",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            info:{
                fname:document.getElementById('fname').value.toLowerCase(),
                lname : document.getElementById('lname').value.toLowerCase(),
                email : document.getElementById('email').value.toLowerCase(),
                phone : document.getElementById('phone').value.replace(/-|\s/g,""),
                address : document.getElementById('address').value,
                city : document.getElementById('city').value,
                prov : document.getElementById('province').value,
                postal : document.getElementById('postal').value.replace(/-|\s/g,"").toUpperCase()
            }
        })
    })
}