import {validatePin,saveUser} from './autentication.js';
let btnNext=document.querySelector('.btn-next-form');
let btnNextAvatar = document.querySelector('#btn-next-avatar');
let btnNextPin="";
let btn_delete; //variable que obtendrá el botón eliminar cuando se dibuje los elementos correspondientes al pin
const areaLogin = document.querySelector('.form-login_area');
const btnSignin = document.querySelector('.btn-sign-in');
const avatars = document.querySelectorAll('.avatar');
const imgUser = document.querySelector('.avatar-chosen'); //se pone la imagén de avatar que eligió el usuario
const LIMIT_NUM = 3; //limite de números que el uuario puede elegir para su PIN
let wrong_msj ="";
let total_number_chosen=0; //cantidad de números elegidos para el PIN
let inputPin = '';
let nameChosenAvatar = ''; //nombre del avatar que eligió el usuario
let btnNum = "";
let textPin = document.createTextNode(''); //se crea un nodo de texto que se va a insertar en el inputPin
let pin="";
//objeto usuario que tendrá los datos para guardar su información
let user = {
    coins_activity_in_out: 0,
    coins_activity_left_right: 0,
    coins_activity_up_down: 0,
    name_avatar: "",
    pin: ""
}

document.addEventListener('DOMContentLoaded', () => {
    addEvent();
})


function addEvent() {
    btnNextAvatar.addEventListener('click', renderContainerPin);
    
    btnSignin.addEventListener('click', () => {
        window.location.assign('login.html');
    });

    avatars.forEach(avatar => {
        avatar.addEventListener('click', getChosenAvatar);
    });
}

//método que obtiene el avatar que el usuario eligió
function getChosenAvatar(e) {
    e.preventDefault();
    let avatar = e.target;
    nameChosenAvatar = avatar.getAttribute("data-avatarName");
    let avatarStyle = window.getComputedStyle(avatar);
    let avatarImg = avatarStyle.getPropertyValue('background-image'); //se obtienen la propiedad background-img del avatar
    imgUser.style.setProperty('background-image', avatarImg);
    enableNextButton();
}
//método que crea un contenedor donde esta los números para la contraseña
function renderContainerPin(e) {
    e.preventDefault();
    areaLogin.innerHTML = `
                <label class="label-login" >Elige tres números para tu PIN</label>
                <div class="form-login_area-pin">
                <div class="input-pin">
                    <button class="btn-delete"></button>
                </div>
                <button data-number="1" class="num num-1">
                    <p data-number="1" class="number-text">1</p> <img data-number="1" class="img-figure-pin"
                        src="/assets/images/numbers/01-bird.png" alt="pájaro">
                </button>
                <button data-number="2" class="num num-2">
                    <p data-number="2" class="number-text">2</p> <img data-number="2" class="img-figure-pin"
                        src="/assets/images/numbers/02-balloon.png" alt="globo">
                </button>
                <button data-number="3" class="num num-3">
                    <p data-number="3" class="number-text">3</p> <img data-number="3" class="img-figure-pin"
                        src="/assets/images/numbers/03-airballoon.png" alt="globo aerostático">
                </button>
                <button data-number="4" class="num num-4">
                    <p data-number="4" class="number-text">4</p> <img data-number="4" class="img-figure-pin"
                        src="/assets/images/numbers/04-sun.png" alt="sol">
                </button>
                <button data-number="5" class="num num-5">
                    <p data-number="5" class="number-text">5</p> <img data-number="5" class="img-figure-pin"
                        src="/assets/images/numbers/05-bee.png" alt="abeja">
                </button>
                <button data-number="6" class="num num-6">
                    <p data-number="6" class="number-text">6</p> <img data-number="6" class="img-figure-pin"
                        src="/assets/images/numbers/06-kite.png" alt="papalote">
                </button>
                <button data-number="7" class="num num-7">
                    <p data-number="7" class="number-text">7</p> <img data-number="7" class="img-figure-pin"
                        src="/assets/images/numbers/07-giraffe.png" alt="jirafa">
                </button>
                <button data-number="8" class="num num-8">
                    <p data-number="8" class="number-text">8</p> <img data-number="8" class="img-figure-pin"
                        src="/assets/images/numbers/08-sunflower.png" alt="girasol">
                </button>
                <button data-number="9" class="num num-9">
                    <p data-number="9" class="number-text">9</p> <img data-number="9" class="img-figure-pin"
                        src="/assets/images/numbers/09-rocket.png" alt="nave    espacial">
                </button>
                <div class="form-login_footer frm-footer-pin">
                    <button class="btn-next-form btn-next-form--disabled" id="btn-next-pin"></button>
                    <p class="wrong-msj"></p>
                </div>
            </div>
        `;

        assignFunctionalityPin();
}

function navigateToAcountCreated() {
    window.location.assign("cuenta-creada.html");
}

function assignFunctionalityPin(params) {
     btnNext=document.querySelector('.btn-next-form');
     wrong_msj = document.querySelector('.wrong-msj');
     btnNextPin=document.querySelector('#btn-next-pin');
     inputPin = document.querySelector('.input-pin');
     inputPin.appendChild(textPin);
     btn_delete = document.querySelector('.btn-delete');
     btn_delete.addEventListener('click', deleteNum); 
     btnNum = document.querySelectorAll('.num' );

      btnNum.forEach(btn => {
          btn.addEventListener('click', writePin);
      });

      btnNextPin.addEventListener('click',saveUserInfo);
}

function writePin(e){
    e.preventDefault();
    if(total_number_chosen<LIMIT_NUM){
        let number =e.target.getAttribute("data-number");
        textPin.data=textPin.data+number;
        total_number_chosen= inputPin.childNodes[3].length;
        pin=inputPin.childNodes[3].data;
    }
    if(total_number_chosen===LIMIT_NUM){
        checkPin(pin);
    }
  
}

async function checkPin(pin) {
    let response= await validatePin(pin);
    if(response){
        wrongMsj("El Pin ya existe");
        disableNextButton();
    }
    else{
        enableNextButton();
    }
}

async function saveUserInfo(e) {
    e.preventDefault();
    disableNextButton();
    user.pin=pin;
    user.name_avatar=nameChosenAvatar;
    let save= await saveUser(user);
    if(save){
        btnNextPin.removeEventListener('click', saveUserInfo);
        enableNextButton();
        navigateToAcountCreated();
    }
    else{
        showError();
    } 
}

function enableNextButton() {
    btnNext.classList.remove("btn-next-form--disabled");
    btnNext.classList.add("btn-next-form--enabled");
}
function disableNextButton() {
    btnNext.classList.remove("btn-next-form--disabled");
    btnNext.classList.add("btn-next-form--enabled");
}

function deleteNum(e) {
    e.preventDefault(); 
    textPin.data= textPin.data.substring(0, total_number_chosen- 1);
     total_number_chosen= inputPin.childNodes[3].length;
     pin=inputPin.childNodes[3].data;
}

function wrongMsj(msj) {
    wrong_msj.textContent=msj;
    wrong_msj.style.visibility='visible';
    setTimeout(()=>{
        wrong_msj.style.visibility='hidden';
    },2000);
}