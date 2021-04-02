function ValidateInput(obj){

    let result = "";
    const {firstName, lastName, email, password} = obj;
            
    result += testEmail(email);
    result += testName(firstName);
    result += testName(lastName);
    result += testPassword(password);
    
    return result
    
}

function testPassword(pw){
    const pwRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}/;
    
    if(!pwRegex.test(pw)){
        return "Password must be atleast 6 characters long, that inclueds at least 1 upper case letter, 1 lower case letter and 1 number\n";
    }
    return "";
}

function testName(name){
    const nameRegx = /^[^#&<>\"~;$@^%*{}?]{1,50}$/g;
    if(!nameRegx.test(name)){
        return "Invalid Name. Do not inclued any special character.\n";
    }
    return "";
}
function testEmail(email){
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)){
        return "*The email address is not valid\n"; 
    }
    return "";
}
