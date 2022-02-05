import {getInfoUserLocalStorage} from './localStorage.js';
const btnExit = document.querySelector('.btn-exit');
const imagePerfil = document.querySelector('.perfil');

document.addEventListener('DOMContentLoaded', ()=>{
    let user = getInfoUserLocalStorage();
    let nameAvatar=user.name_avatar;
    console.log(nameAvatar);
    imagePerfil.style.setProperty('background-image', `url(/assets/images/avatars/${nameAvatar}.svg)`);
    addEvents();
});


function addEvents() {
    btnExit.addEventListener('click', ()=>{
        window.location.replace("/index.html");
    });
    
}


