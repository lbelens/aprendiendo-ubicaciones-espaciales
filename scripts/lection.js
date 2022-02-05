import {utterText, stopSpeech, getVoice} from './speech.js';
const btnBack= document.querySelector('.navigation-btn_back');
const btnNext= document.querySelector('.navigation-btn_next');
const btnLeft = document.querySelector('.btn-left');
const btnRight=document.querySelector('.btn-right');
const rabbitLeft = document.querySelector('#rabbit-left');
const rabbitRight=document.querySelector('#rabbit-right');


document.addEventListener('DOMContentLoaded',()=>{
    addEvents();
    getVoice();
})

function addEvents() {
    btnLeft.addEventListener('click', (e)=>{
        e.preventDefault();
        stopSpeech();
        utterText('Izquierda');
        rabbitRight.stop();
        rabbitLeft.play();
    });
    btnRight.addEventListener('click', (e)=>{
        e.preventDefault();
        //decir texto derecha
        stopSpeech();
        utterText('Derecha');
        rabbitLeft.stop();
        rabbitRight.play();
    });
    btnBack.addEventListener('click', ()=>{
        window.location.href='index.html';
    });

    btnNext.addEventListener('click',()=>{
        window.location.href='ejercicio.html';
    } );
}