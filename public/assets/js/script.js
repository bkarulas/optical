let storeCity = 22;
let storeProv = 1;
let storeCountry = 1;

//document.getElementById('loggedinuser').innerHTML = await loggedInUser();

//document.getElementById('loggedinuser').innerHTML = 
document.addEventListener('DOMContentLoaded', async function(e) {
  e.preventDefault();
  let user = await loggedInUser() 
  document.getElementById('loggedinuser').innerHTML = user.charAt(0).toUpperCase() + user.slice(1)
}, false);


async function loggedInUser(){
  let user = '';
  await fetch('/api/general/loggedinuser',{
    method:"GET",
    headers: { "Content-Type": "application/json" }
})
  .then(response => response.json())
  .then(data => user = (JSON.parse(data)[0].fname));
  return user;
}


function navFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  }