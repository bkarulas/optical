const mainMenuSections = ['admin', 'store', 'customer', 'inventory', 'reports']

// window.onload = function(){
//     mainMenuSections.forEach(sec => {
//         let menuSec = document.getElementById(`menu-${sec}`);
//         menuSec.style.display = 'none';
//     });
// }

function showMenu(section){
    let menuSection = document.getElementById(`menu-${section}`);
    if (menuSection.style.display === 'block'){
        menuSection.style.display = 'none';
    }else{
        mainMenuSections.forEach(sec => {
            let menuSec = document.getElementById(`menu-${sec}`);
            menuSec.style.display = 'none';
        });
        menuSection.style.display = 'block'
    }
}

