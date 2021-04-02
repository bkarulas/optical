
//New Store
addNewStoreDropDowns()
let citySel = document.getElementById('form-city');
let provSel = document.getElementById('form-prov');
let countrySel = document.getElementById('form-country');

//Changes the city depending o nthe provence
provSel.onchange = async function(){
    citySel.innerHTML='';
    let provVal = provSel.value;
    console.log(provVal);
    let cityAll = await getCitysByProvince(provVal);
    cityAll.forEach(city => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',city.id);
        newOption.innerText = city.name;
        citySel.appendChild(newOption);
    });
}

//Prints out the defult 3 drop down menues for the form
async function addNewStoreDropDowns() {
    //country drop down
    let countryAll = await getCountries();
    countryAll.forEach(country => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',country.id);
        newOption.innerText = country.name;
        countrySel.appendChild(newOption);
    });
    //provence drop down depending on the country value
    let countryVal = countrySel.value;
    let provAll = await getProvincesByCountry(countryVal);
    provAll.forEach(prov => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',prov.id);
        newOption.innerText = prov.name;
        provSel.appendChild(newOption);
    });
    //city drop down depending on the provence
    let provVal = provSel.value;
    let cityAll = await getCitysByProvince(provVal);
    cityAll.forEach(city => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',city.id);
        newOption.innerText = city.name;
        citySel.appendChild(newOption);
    });
}

//submit the new customer form
function addNewStore (){
    console.log(`city-js - ${document.getElementById('form-city').value}`)
    console.log(`counrty-js - ${document.getElementById('form-country').value}`)
    fetch("/api/admin/store/new",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            info:{
                name:document.getElementById('form-name').value.toLowerCase(),
                email:document.getElementById('form-email').value.toLowerCase(),
                phone:document.getElementById('form-hphone').value.replace(/-|\s/g,""),
                fax:document.getElementById('form-cphone').value.replace(/-|\s/g,""),
                address:document.getElementById('form-address').value.toLowerCase(),
                city:document.getElementById('form-city').value,
                prov:document.getElementById('form-prov').value,
                country:document.getElementById('form-country').value,
                postal:document.getElementById('form-postal').value.toLowerCase(),
            }
        })
    })
}


//DB CALLS
async function getCountries(){
    const res = await fetch("/api/general/country",{
        method:"POST",
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}


async function getProvincesByCountry(contry){
    const res = await fetch("/api/general/province",{
        method:"POST",
        body: JSON.stringify({info:contry}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

async function getCitysByProvince(prov){
    const res = await fetch("/api/general/city",{
        method:"POST",
        body: JSON.stringify({info:prov}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}