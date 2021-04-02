
//NewCustomer
function newCustomerForm(){
    document.getElementById('new-customer-btn').style.display = 'none';
    document.getElementById('search-customer').style.display = 'none';
    document.getElementById('new-customer').style.display = 'block';
    document.getElementById('form-title').innerText = "New Customer"
    document.getElementById('resetBtn').setAttribute('type', 'reset')
    document.getElementById('resetBtn').innerText = 'RESET';
    document.getElementById('submitBtn').setAttribute('onclick', 'addNewCustomer()')
    addNewCustomerDropDowns(storeCountry, storeProv, storeCity)
}

//Changes the city depending o nthe provence
let citySel = document.getElementById('form-city');
let provSel = document.getElementById('form-prov');
let countrySel = document.getElementById('form-country');
provSel.onchange = async function(){
    citySel.innerHTML='';
    let provVal = provSel.value;
    let cityAll = await getCitysByProvince(provVal);
    cityAll.forEach(city => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',city.id);
        newOption.innerText = city.name;
        citySel.appendChild(newOption);
    });
}

//Prints out the defult 3 drop down menues for the form
async function addNewCustomerDropDowns(theCountry, theProv, theCity) {
    //country drop down
    let countryAll = await getCountries();
    countryAll.forEach(country => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',country.id);
        newOption.innerText = country.name;
        (theCountry == country.id)?newOption.selected=true:newOption.selected=false;
        countrySel.appendChild(newOption);
    });
    //provence drop down depending on the country value
    let countryVal = countrySel.value;
    let provAll = await getProvincesByCountry(countryVal);
    provAll.forEach(prov => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',prov.id);
        newOption.innerText = prov.name;
        (theProv == prov.id)?newOption.selected=true:newOption.selected=false;
        provSel.appendChild(newOption);
    });
    //city drop down depending on the provence
    let provVal = provSel.value;
    let cityAll = await getCitysByProvince(provVal);
    cityAll.forEach(city => {
        let newOption = document.createElement('option');
        newOption.setAttribute('value',city.id);
        newOption.innerText = city.name;
        (theCity == city.id)?newOption.selected=true:newOption.selected=false;
        citySel.appendChild(newOption);
    });
}

//submit the new customer form
function addNewCustomer (){
    let planCheck = document.getElementById("form-plan").checked;
    let hnum = numberInput(document.getElementById('form-hphone').value.replace(/[^0-9\.]+/g,""));
    let cnum = numberInput(document.getElementById('form-cphone').value.replace(/[^0-9\.]+/g,""));
    let wnum = numberInput(document.getElementById('form-wphone').value.replace(/[^0-9\.]+/g,""))
    fetch("/api/customer/new",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            info:{
                fname:document.getElementById('form-fname').value.toLowerCase(),
                lname:document.getElementById('form-lname').value.toLowerCase(),
                email:document.getElementById('form-email').value.toLowerCase(),
                hphone:hnum,
                cphone:cnum,
                wphone:wnum,
                address:document.getElementById('form-address').value.toLowerCase(),
                city:document.getElementById('form-city').value,
                prov:document.getElementById('form-prov').value,
                country:document.getElementById('form-country').value,
                postal:document.getElementById('form-postal').value.toLowerCase(),
                plan:planCheck
            }
        })
    })
}

function numberInput(num){
    if (num.lenght < 11){
        return num
    }else{
        num = num.slice(num.length - 10)
        return num
    }
}


//SEARCH CUSTOMERS
let input = document.querySelector('#form-search');
let searchBar = document.getElementById('form-search');

//search
document.addEventListener('DOMContentLoaded', async function(e) {
    e.preventDefault();
    await getAllCustomers()
    printSearchResults(await getAllCustomers()) 
}, false);


input.addEventListener("keyup",function(e){
    e.preventDefault();
    startSearching(searchBar.value.toLowerCase())
})

async function startSearching(searchFor){
    let allCustomers = await getAllCustomers();
    let searchResult = [];
    allCustomers.forEach(cust => {
        if ((cust.fname.includes(searchFor)) || (cust.lname.includes(searchFor)) || (cust.email.includes(searchFor)) || (cust.hphone.includes(searchFor)) || (cust.cphone.includes(searchFor)) || (cust.wphone.includes(searchFor))){
            searchResult.push(cust);
        }
    });
    printSearchResults(searchResult);
}

function printSearchResults(searchResults, allCustomers){
    let resultsDiv = document.getElementById('search-results')
    resultsDiv.innerHTML = '';
    //TITLE
    let customerTitleDiv = document.createElement('div')
    customerTitleDiv.setAttribute('class', 'search-title')
    customerTitleDiv.appendChild(printCustomerResult('Name', 'long'))
    customerTitleDiv.appendChild(printCustomerResult('Email', 'long'))
    customerTitleDiv.appendChild(printCustomerResult('Home', 'short'))
    customerTitleDiv.appendChild(printCustomerResult('Cell', 'short'))
    customerTitleDiv.appendChild(printCustomerResult('Work', 'short'))
    resultsDiv.appendChild(customerTitleDiv)
    for (let i=0; i<searchResults.length; i++){
        let customerLink = document.createElement('a')
        customerLink.setAttribute('onclick', `getCustomer('${searchResults[i].id}')`)
        let resultbg;
        (i%2) ? resultbg='light' : resultbg='dark';
        customerLink.setAttribute('class', `customer-search ${resultbg}`)
        let name = `${searchResults[i].lname.charAt(0).toUpperCase() + searchResults[i].lname.slice(1)}, ${searchResults[i].fname.charAt(0).toUpperCase() + searchResults[i].fname.slice(1)}`
        customerLink.appendChild(printCustomerResult(name, 'long'))
        customerLink.appendChild(printCustomerResult(searchResults[i].email, 'long'))
        customerLink.appendChild(printCustomerResult(formatNumber(searchResults[i].hphone), 'short'))
        customerLink.appendChild(printCustomerResult(formatNumber(searchResults[i].cphone), 'short'))
        customerLink.appendChild(printCustomerResult(formatNumber(searchResults[i].wphone), 'short'))
        resultsDiv.appendChild(customerLink)
    }
}

function printCustomerResult(value, wide){
    let valueDiv = document.createElement('div');
    valueDiv.setAttribute('class', wide)
    valueDiv.innerHTML = value
    return (valueDiv);
}

//finds the index in the array of users
// function findIndexId (id, allCust){
//     const index = allCust.findIndex((e) => {
//         if (e.id === id) {
//           return true
//         }
//       })
//       return index;
// }

//formats the phone number
function formatNumber(num){
    if (num.length>1){
        return `(${num.substring(0,3)})${num.substring(3,6)}-${num.substring(6,10)}`
    }else{
        return ''
    }
}

function formatAddress(add){
    let words = add.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

//One customer
async function getCustomer(id){
    document.getElementById('new-customer-btn').style.display = 'none';
    document.getElementById('search-customer').style.display = 'none';
    document.getElementById('one-customer').style.display = 'block';
    let customer = await getOneCustomer(id)
    console.log (customer[0]);
    document.getElementById('customer-name').innerText = `${customer[0].fname.charAt(0).toUpperCase() + customer[0].fname.slice(1)} ${customer[0].lname.charAt(0).toUpperCase() + customer[0].lname.slice(1)}`;
    document.getElementById('customer-info-email').innerText = customer[0].email;
    document.getElementById('customer-info-hphone').innerText = checkIfPhone('hphone', customer[0].hphone);
    document.getElementById('customer-info-cphone').innerText = checkIfPhone('cphone', customer[0].cphone);
    document.getElementById('customer-info-wphone').innerText = checkIfPhone('wphone', customer[0].wphone);
    document.getElementById('customer-info-address').innerText = formatAddress(customer[0].address);
    document.getElementById('customer-info-city').innerText = customer[0].city;
    document.getElementById('customer-info-prov').innerText = customer[0].province;
    document.getElementById('customer-info-country').innerText = customer[0].country;
    document.getElementById('customer-info-postal').innerText = customer[0].postal.toUpperCase();
    createOneCustomerButtons(id);

}

function checkIfPhone(div, number){
    console.log(div, number)
    if (number != ''){
        return formatNumber(number);
    }else{
        document.getElementById(`customer-info-${div}`).style.display = 'none';
        document.getElementById(`customer-info-${div}-title`).style.display = 'none';
    }
}

//one customer buttons
//create buttons
function createOneCustomerButtons(id){
    buttonSection = document.getElementById('customer-btn')
    buttonSection.appendChild(createButton('edit', id))
    buttonSection.appendChild(createButton('purchase', id))
    buttonSection.appendChild(createButton('family', id))
    buttonSection.appendChild(createButton('delete', id))
}

function createButton(btn, id){
    let btnDiv = document.createElement('button');
    btnDiv.innerText = btn.charAt(0).toUpperCase() + btn.slice(1)
    btnDiv.setAttribute('id', `${btn}-customer`);
    btnDiv.setAttribute('onclick', `${btn}Customer('${id}')`)
    return btnDiv;
}

//button click
//edit customer
async function editCustomer(id){
    let customerInfo = await getOneCustomer(id)
    console.log(`EDIT - ${id}`);
    console.log (customerInfo)
    document.getElementById('new-customer-btn').style.display = 'none';
    document.getElementById('search-customer').style.display = 'none';
    document.getElementById('one-customer').style.display = 'none'
    document.getElementById('new-customer').style.display = 'block';
    document.getElementById('form-title').innerText = "Edit Customer"
    document.getElementById('form-fname').value = customerInfo[0].fname.charAt(0).toUpperCase() + customerInfo[0].fname.slice(1);
    document.getElementById('form-lname').value = customerInfo[0].lname.charAt(0).toUpperCase() + customerInfo[0].lname.slice(1);
    document.getElementById('form-email').value = customerInfo[0].email;
    document.getElementById('form-hphone').value = customerInfo[0].hphone;
    document.getElementById('form-cphone').value = customerInfo[0].cphone;
    document.getElementById('form-wphone').value = customerInfo[0].wphone;
    document.getElementById('form-address').value = formatAddress(customerInfo[0].address);
    document.getElementById('form-postal').value = customerInfo[0].postal.toUpperCase();
    document.getElementById('resetBtn').innerText = 'CANCEL';
    document.getElementById('resetBtn').setAttribute('onclick','window.location.reload()' )
    document.getElementById('submitBtn').setAttribute('onclick', `submitEditCustomer('${id}')`)
    addNewCustomerDropDowns(customerInfo[0].counrtyId, customerInfo[0].provId, customerInfo[0].cityId)
}
//purchase customer
function purchaseCustomer(id){
    console.log(`PURCHASE - ${id}`);
}
//family customer
function familyCustomer(id){
    console.log(`FAMILY - ${id}`);
}
//delete customer
async function deleteCustomer(id){
    console.log(`DELETE - ${id}`);
    const res = await fetch("/api/customer/delete",{
        method:"POST",
        body: JSON.stringify({info:id}),
        headers: { "Content-Type": "application/json" }
    });
    window.location.reload()
}

//Input new customer info
async function submitEditCustomer(id){
    let hnum = numberInput(document.getElementById('form-hphone').value.replace(/[^0-9\.]+/g,""));
    let cnum = numberInput(document.getElementById('form-cphone').value.replace(/[^0-9\.]+/g,""));
    let wnum = numberInput(document.getElementById('form-wphone').value.replace(/[^0-9\.]+/g,""))
    console.log(document.getElementById('form-fname').value.toLowerCase())
    fetch("/api/customer/edit",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            info:{
                id:id,
                fname:document.getElementById('form-fname').value.toLowerCase(),
                lname:document.getElementById('form-lname').value.toLowerCase(),
                email:document.getElementById('form-email').value.toLowerCase(),
                hphone:hnum,
                cphone:cnum,
                wphone:wnum,
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
//all countries
async function getCountries(){
    const res = await fetch("/api/general/country",{
        method:"POST",
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//all provences/state by country
async function getProvincesByCountry(contry){
    const res = await fetch("/api/general/province",{
        method:"POST",
        body: JSON.stringify({info:contry}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//all cities by provence/state
async function getCitysByProvince(prov){
    const res = await fetch("/api/general/city",{
        method:"POST",
        body: JSON.stringify({info:prov}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//get all customers for user
async function getAllCustomers(){
    const res = await fetch("/api/customer/all",{
            method:"GET",
            //body: JSON.stringify({adminId}),//users for when there is a login
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//get one customer by id
async function getOneCustomer(id){
    const res = await fetch("/api/customer/one",{
        method:"POST",
        body: JSON.stringify({info:id}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}
