import {getUser} from './autentication.js';
import {saveInfoUserLocalStorage} from './localStorage.js';
const btnNext = document.querySelector('.btn-next-form');
const LIMIT_NUM=3; //limite de números que el uuario puede elegir para su PIN
const btn_delete = document.querySelector('.btn-delete');
const wrong_msj = document.querySelector('.wrong-msj');
const btnSignup = document.querySelector('.btn-sign-up');
let inputPin = document.querySelector('.input-pin');
let btnNum = document.querySelectorAll('.num');
let total_number_chosen=0; //cantidad de números elegidos para el PIN
let textPin = document.createTextNode(''); //se crea un nodo de texto que se va a insertar en el inputPin
let pin="";
addEvent();

function addEvent() {
    inputPin.appendChild(textPin);

    btn_delete.addEventListener('click',deleteNum);

    btnNum.forEach(btn=>{
    btn.addEventListener('click', writePin);
    }); 

    btnNext.addEventListener('click',checkPin);
    
    btnSignup.addEventListener('click',()=>{
        window.location.assign('signup.html');
    });
}

async function checkPin(e) {
    e.preventDefault();
    if(pin===""){
        wrongMsj("Campo vacío");
    }
    else{
        if(pin.length<LIMIT_NUM){
            wrongMsj("Pin incorrecto");
        }
        else{
            //Autenticar Pin
            let user= await getUser(pin);
            if(user!=undefined){
                saveInfoUserLocalStorage(user);
                window.location.assign('menu.html');
            }
            else{
                wrongMsj('El pin no existe');
            }
        }
    }
}


function writePin(e){
    e.preventDefault();
    if(total_number_chosen<LIMIT_NUM){
        let number =e.target.getAttribute("data-number");
        textPin.data=textPin.data+number;
        total_number_chosen= inputPin.childNodes[3].length;
        pin=inputPin.childNodes[3].data;
    }
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

